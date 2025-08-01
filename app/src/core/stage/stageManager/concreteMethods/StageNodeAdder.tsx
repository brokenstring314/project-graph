import { Color, MonoStack, ProgressNumber, Vector } from "@graphif/data-structures";
import { Rectangle } from "@graphif/shapes";
import { v4 as uuidv4 } from "uuid";
import { Direction } from "@/types/directions";
import { MarkdownNode, parseMarkdownToJSON } from "@/utils/markdownParse";
import { Project, service } from "@/core/Project";
import { RectanglePushInEffect } from "@/core/service/feedbackService/effectEngine/concrete/RectanglePushInEffect";
import { Settings } from "@/core/service/Settings";
import { ConnectableEntity } from "@/core/stage/stageObject/abstract/ConnectableEntity";
import { CollisionBox } from "@/core/stage/stageObject/collisionBox/collisionBox";
import { ConnectPoint } from "@/core/stage/stageObject/entity/ConnectPoint";
import { Section } from "@/core/stage/stageObject/entity/Section";
import { TextNode } from "@/core/stage/stageObject/entity/TextNode";

/**
 * 包含增加节点的方法
 * 有可能是用鼠标增加，涉及自动命名器
 * 也有可能是用键盘增加，涉及快捷键和自动寻找空地
 */
@service("nodeAdder")
export class NodeAdder {
  constructor(private readonly project: Project) {}

  /**
   * 通过点击位置增加节点
   * @param clickWorldLocation
   * @returns
   */
  async addTextNodeByClick(
    clickWorldLocation: Vector,
    addToSections: Section[],
    selectCurrent = false,
  ): Promise<string> {
    const newUUID = uuidv4();
    const node = new TextNode(this.project, {
      uuid: newUUID,
      text: await this.getAutoName(),
      details: "",
      collisionBox: new CollisionBox([new Rectangle(clickWorldLocation, Vector.getZero())]),
    });
    node.color = await this.getAutoColor();
    // 将node本身向左上角移动，使其居中
    node.moveTo(node.rectangle.location.subtract(node.rectangle.size.divide(2)));
    this.project.stageManager.add(node);

    for (const section of addToSections) {
      section.children.push(node);
      section.childrenUUIDs.push(node.uuid); // 修复
      section.adjustLocationAndSize();
      this.project.effects.addEffect(
        new RectanglePushInEffect(node.rectangle.clone(), section.rectangle.clone(), new ProgressNumber(0, 100)),
      );
    }
    // 处理选中问题
    if (selectCurrent) {
      for (const otherNode of this.project.stageManager.getTextNodes()) {
        if (otherNode.isSelected) {
          otherNode.isSelected = false;
        }
      }
      node.isSelected = true;
    }

    this.project.historyManager.recordStep();
    return newUUID;
  }

  /**
   * 在当前已经选中的某个节点的情况下，增加节点
   * 增加在某个选中的节点的上方，下方，左方，右方等位置
   * ——快深频
   * @param selectCurrent
   * @returns 返回的是创建节点的uuid，如果当前没有选中节点，则返回空字符串
   */
  async addTextNodeFromCurrentSelectedNode(
    direction: Direction,
    addToSections: Section[],
    selectCurrent = false,
  ): Promise<string> {
    // 先检查当前是否有选中的唯一实体
    const selectedEntities = this.project.stageManager
      .getSelectedEntities()
      .filter((entity) => entity instanceof ConnectableEntity);
    if (selectedEntities.length !== 1) {
      // 未选中或选中多个
      return "";
    }
    /**
     * 当前选择的实体
     */
    const selectedEntity = selectedEntities[0];
    const entityRectangle = selectedEntity.collisionBox.getRectangle();
    let createLocation = new Vector(0, 0);
    const distanceLength = 100;
    if (direction === Direction.Up) {
      createLocation = entityRectangle.topCenter.add(new Vector(0, -distanceLength));
    } else if (direction === Direction.Down) {
      createLocation = entityRectangle.bottomCenter.add(new Vector(0, distanceLength));
    } else if (direction === Direction.Left) {
      createLocation = entityRectangle.leftCenter.add(new Vector(-distanceLength, 0));
    } else if (direction === Direction.Right) {
      createLocation = entityRectangle.rightCenter.add(new Vector(distanceLength, 0));
    }
    addToSections = this.project.sectionMethods.getFatherSections(selectedEntity);
    const uuid = await this.addTextNodeByClick(createLocation, addToSections, selectCurrent);
    const newNode = this.project.stageManager.getTextNodeByUUID(uuid);
    if (!newNode) {
      throw new Error("Failed to add node");
    }
    // 如果是通过上下创建的节点，则需要左对齐
    if (direction === Direction.Up || direction === Direction.Down) {
      const distance = newNode.rectangle.left - entityRectangle.left;
      newNode.moveTo(newNode.rectangle.location.add(new Vector(-distance, 0)));
    }
    if (direction === Direction.Left) {
      // 顶对齐
      const distance = newNode.rectangle.top - entityRectangle.top;
      newNode.moveTo(newNode.rectangle.location.add(new Vector(0, -distance)));
    }
    if (direction === Direction.Right) {
      // 顶对齐，+ 自己对齐到目标的右侧
      const targetLocation = entityRectangle.rightTop;
      newNode.moveTo(targetLocation);
    }
    if (direction === Direction.Up) {
      const targetLocation = entityRectangle.leftTop.add(new Vector(0, newNode.collisionBox.getRectangle().height));
      newNode.moveTo(targetLocation);
    }
    if (direction === Direction.Down) {
      const targetLocation = entityRectangle.leftBottom;
      newNode.moveTo(targetLocation);
    }
    this.project.historyManager.recordStep();
    return uuid;
  }

  private async getAutoName(): Promise<string> {
    let template = await Settings.get("autoNamerTemplate");
    template = this.project.stageUtils.replaceAutoNameTemplate(template, this.project.stageManager.getTextNodes()[0]);
    return template;
  }

  private async getAutoColor(): Promise<Color> {
    const isEnable = await Settings.get("autoFillNodeColorEnable");
    if (isEnable) {
      const colorData = await Settings.get("autoFillNodeColor");
      return new Color(...colorData);
    } else {
      return Color.Transparent;
    }
  }

  public addConnectPoint(clickWorldLocation: Vector, addToSections: Section[]): string {
    const newUUID = uuidv4();
    const connectPoint = new ConnectPoint(this.project, {
      uuid: newUUID,
      location: [clickWorldLocation.x, clickWorldLocation.y],
    });
    this.project.stageManager.add(connectPoint);
    for (const section of addToSections) {
      section.children.push(connectPoint);
      section.childrenUUIDs.push(connectPoint.uuid);
      section.adjustLocationAndSize();
      this.project.effects.addEffect(
        new RectanglePushInEffect(
          connectPoint.collisionBox.getRectangle(),
          section.rectangle.clone(),
          new ProgressNumber(0, 100),
        ),
      );
    }
    this.project.historyManager.recordStep();
    return newUUID;
  }
  /**
   * 通过纯文本生成网状结构
   *
   * @param text 网状结构的格式文本
   * @param diffLocation
   */
  public addNodeGraphByText(text: string, diffLocation: Vector = Vector.getZero()) {
    const lines = text.split("\n");

    if (lines.length === 0) {
      return;
    }

    const randomRadius = 40 * lines.length;

    const nodeDict = new Map<string, TextNode>();

    const createNodeByName = (name: string) => {
      const newUUID = uuidv4();
      const node = new TextNode(this.project, {
        uuid: newUUID,
        text: name,
        details: "",
        location: [diffLocation.x + randomRadius * Math.random(), diffLocation.y + randomRadius * Math.random()],
        size: [100, 100],
      });
      this.project.stageManager.add(node);
      nodeDict.set(name, node);
      return node;
    };

    for (const line of lines) {
      if (line.trim() === "") {
        continue;
      }
      if (line.includes("-->") || (line.includes("-") && line.includes("->"))) {
        // 这一行是一个关系行
        if (line.includes("-->")) {
          // 连线上无文字
          // 解析
          const names = line.split("-->");
          if (names.length !== 2) {
            throw new Error(`解析时出现错误: "${line}"，应该只有两个名称`);
          }
          const startName = names[0].trim();
          const endName = names[1].trim();
          if (startName === "" || endName === "") {
            throw new Error(`解析时出现错误: "${line}"，名称不能为空`);
          }
          let startNode = nodeDict.get(startName);
          let endNode = nodeDict.get(endName);
          if (!startNode) {
            startNode = createNodeByName(startName);
          }
          if (!endNode) {
            endNode = createNodeByName(endName);
          }
          this.project.stageManager.connectEntity(startNode, endNode);
        } else {
          // 连线上有文字
          // 解析
          // A -xx-> B
          const names = line.split("->");
          if (names.length !== 2) {
            throw new Error(`解析时出现错误: "${line}"，应该只有两个名称`);
          }
          const leftContent = names[0].trim();
          const endName = names[1].trim();
          if (leftContent === "" || endName === "") {
            throw new Error(`解析时出现错误: "${line}"，名称不能为空`);
          }
          let endNode = nodeDict.get(endName);
          if (!endNode) {
            // 没有endNode，临时创建一下
            endNode = createNodeByName(endName);
          }
          const leftContentList = leftContent.split("-");
          if (leftContentList.length !== 2) {
            throw new Error(`解析时出现错误: "${line}"，左侧内容应该只有两个名称`);
          }
          const startName = leftContentList[0].trim();
          const edgeText = leftContentList[1].trim();
          if (startName === "" || edgeText === "") {
            throw new Error(`解析时出现错误: "${line}"，名称不能为空`);
          }
          let startNode = nodeDict.get(startName);
          if (!startNode) {
            // 临时创建一下
            startNode = createNodeByName(startName);
          }
          this.project.stageManager.connectEntity(startNode, endNode);
          // 在线上填写文字
          const edge = this.project.graphMethods.getEdgeFromTwoEntity(startNode, endNode);
          if (edge === null) {
            throw new Error(`解析时出现错误: "${line}"，找不到对应的连线`);
          }
          edge.rename(edgeText);
        }
      } else {
        // 这一行是一个节点行
        // 获取节点名称，创建节点
        const nodeName = line.trim();
        createNodeByName(nodeName);
      }
    }
  }
  /**
   * 通过带有缩进格式的文本来增加节点
   */
  public addNodeTreeByText(text: string, indention: number, diffLocation: Vector = Vector.getZero()) {
    // 将本文转换成字符串数组，按换行符分割
    const lines = text.split("\n");

    const rootUUID = uuidv4();

    // 准备好栈和根节点
    const rootNode = new TextNode(this.project, {
      uuid: rootUUID,
      text: "root",
      details: "",
      location: [diffLocation.x, diffLocation.y],
      size: [100, 100],
    });
    const nodeStack = new MonoStack<TextNode>();
    nodeStack.push(rootNode, -1);
    this.project.stageManager.add(rootNode);
    // 遍历每一行
    for (let yIndex = 0; yIndex < lines.length; yIndex++) {
      const line = lines[yIndex];
      // 跳过空行
      if (line.trim() === "") {
        continue;
      }
      // 解析缩进格式
      const indent = this.getIndentLevel(line, indention);
      // 解析文本内容
      const textContent = line.trim();

      const newUUID = uuidv4();
      const node = new TextNode(this.project, {
        uuid: newUUID,
        text: textContent,
        details: "",
        location: [indent * 50 + diffLocation.x, yIndex * 100 + diffLocation.y],
        size: [100, 100],
      });
      this.project.stageManager.add(node);

      // 检查栈
      // 保持一个严格单调栈
      if (nodeStack.peek()) {
        nodeStack.push(node, indent);
        const fatherNode = nodeStack.unsafeGet(nodeStack.length - 2);
        this.project.stageManager.connectEntity(fatherNode, node);
      }
    }
  }

  /***
   * 'a' -> 0
   * '    a' -> 1
   * '\t\ta' -> 2
   */
  private getIndentLevel(line: string, indention: number): number {
    let indent = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") {
        indent++;
      } else if (line[i] === "\t") {
        indent += indention;
      } else {
        break;
      }
    }
    return Math.floor(indent / indention);
  }

  public addNodeByMarkdown(markdownText: string, diffLocation: Vector = Vector.getZero()) {
    const markdownJson = parseMarkdownToJSON(markdownText);
    // 遍历markdownJson
    const dfsMarkdownNode = (markdownNode: MarkdownNode, deepLevel: number) => {
      // visit
      visitFunction(markdownNode, deepLevel);
      // visited
      for (const child of markdownNode.children) {
        dfsMarkdownNode(child, deepLevel + 1);
      }
    };
    const monoStack = new MonoStack<TextNode>();
    monoStack.push(
      new TextNode(this.project, {
        uuid: uuidv4(),
        text: "root",
        details: "",
        location: [diffLocation.x, diffLocation.y],
        size: [100, 100],
      }),
      -1,
    );

    let visitedCount = 0;

    const visitFunction = (markdownNode: MarkdownNode, deepLevel: number) => {
      visitedCount++;
      const newUUID = uuidv4();
      const node = new TextNode(this.project, {
        uuid: newUUID,
        text: markdownNode.title,
        details: markdownNode.content,
        location: [diffLocation.x + deepLevel * 50, diffLocation.y + visitedCount * 100],
        size: [100, 100],
      });
      this.project.stageManager.add(node);
      monoStack.push(node, deepLevel);
      // 连接父节点
      const fatherNode = monoStack.unsafeGet(monoStack.length - 2);
      this.project.stageManager.connectEntity(fatherNode, node);
    };

    dfsMarkdownNode(markdownJson[0], 0);
  }
}
