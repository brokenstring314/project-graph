import { FileSystemProvider, Service } from "@/core/interfaces/Service";
import type { CurveRenderer } from "@/core/render/canvas2d/basicRenderer/curveRenderer";
import type { ImageRenderer } from "@/core/render/canvas2d/basicRenderer/ImageRenderer";
import type { ShapeRenderer } from "@/core/render/canvas2d/basicRenderer/shapeRenderer";
import type { SvgRenderer } from "@/core/render/canvas2d/basicRenderer/svgRenderer";
import type { TextRenderer } from "@/core/render/canvas2d/basicRenderer/textRenderer";
import type { DrawingControllerRenderer } from "@/core/render/canvas2d/controllerRenderer/drawingRenderer";
import type { CollisionBoxRenderer } from "@/core/render/canvas2d/entityRenderer/CollisionBoxRenderer";
import type { StraightEdgeRenderer } from "@/core/render/canvas2d/entityRenderer/edge/concrete/StraightEdgeRenderer";
import type { SymmetryCurveEdgeRenderer } from "@/core/render/canvas2d/entityRenderer/edge/concrete/SymmetryCurveEdgeRenderer";
import type { VerticalPolyEdgeRenderer } from "@/core/render/canvas2d/entityRenderer/edge/concrete/VerticalPolyEdgeRenderer";
import type { EdgeRenderer } from "@/core/render/canvas2d/entityRenderer/edge/EdgeRenderer";
import type { EntityDetailsButtonRenderer } from "@/core/render/canvas2d/entityRenderer/EntityDetailsButtonRenderer";
import type { EntityRenderer } from "@/core/render/canvas2d/entityRenderer/EntityRenderer";
import type { MultiTargetUndirectedEdgeRenderer } from "@/core/render/canvas2d/entityRenderer/multiTargetUndirectedEdge/MultiTargetUndirectedEdgeRenderer";
import type { PortalNodeRenderer } from "@/core/render/canvas2d/entityRenderer/portalNode/portalNodeRenderer";
import type { SectionRenderer } from "@/core/render/canvas2d/entityRenderer/section/SectionRenderer";
import type { SvgNodeRenderer } from "@/core/render/canvas2d/entityRenderer/svgNode/SvgNodeRenderer";
import type { TextNodeRenderer } from "@/core/render/canvas2d/entityRenderer/textNode/TextNodeRenderer";
import type { UrlNodeRenderer } from "@/core/render/canvas2d/entityRenderer/urlNode/urlNodeRenderer";
import type { Renderer } from "@/core/render/canvas2d/renderer";
import type { BackgroundRenderer } from "@/core/render/canvas2d/utilsRenderer/backgroundRenderer";
import type { RenderUtils } from "@/core/render/canvas2d/utilsRenderer/RenderUtils";
import type { SearchContentHighlightRenderer } from "@/core/render/canvas2d/utilsRenderer/searchContentHighlightRenderer";
import type { WorldRenderUtils } from "@/core/render/canvas2d/utilsRenderer/WorldRenderUtils";
import type { InputElement } from "@/core/render/domElement/inputElement";
import type { AutoLayoutFastTree } from "@/core/service/controlService/autoLayoutEngine/autoLayoutFastTreeMode";
import type { AutoLayout } from "@/core/service/controlService/autoLayoutEngine/mainTick";
import type { ControllerUtils } from "@/core/service/controlService/controller/concrete/utilsControl";
import type { Controller } from "@/core/service/controlService/controller/Controller";
import type { KeyboardOnlyEngine } from "@/core/service/controlService/keyboardOnlyEngine/keyboardOnlyEngine";
import type { KeyboardOnlyGraphEngine } from "@/core/service/controlService/keyboardOnlyEngine/keyboardOnlyGraphEngine";
import type { KeyboardOnlyTreeEngine } from "@/core/service/controlService/keyboardOnlyEngine/keyboardOnlyTreeEngine";
import type { SelectChangeEngine } from "@/core/service/controlService/keyboardOnlyEngine/selectChangeEngine";
import type { RectangleSelect } from "@/core/service/controlService/rectangleSelectEngine/rectangleSelectEngine";
import type { KeyBinds } from "@/core/service/controlService/shortcutKeysEngine/KeyBinds";
import type { KeyBindsRegistrar } from "@/core/service/controlService/shortcutKeysEngine/shortcutKeysRegister";
import type { MouseInteraction } from "@/core/service/controlService/stageMouseInteractionCore/stageMouseInteractionCore";
import type { AutoComputeUtils } from "@/core/service/dataGenerateService/autoComputeEngine/AutoComputeUtils";
import type { AutoCompute } from "@/core/service/dataGenerateService/autoComputeEngine/mainTick";
import type { GenerateFromFolder } from "@/core/service/dataGenerateService/generateFromFolderEngine/GenerateFromFolderEngine";
import type { StageExport } from "@/core/service/dataGenerateService/stageExportEngine/stageExportEngine";
import type { StageExportPng } from "@/core/service/dataGenerateService/stageExportEngine/StageExportPng";
import type { StageExportSvg } from "@/core/service/dataGenerateService/stageExportEngine/StageExportSvg";
import type { AIEngine } from "@/core/service/dataManageService/aiEngine/AIEngine";
import type { ComplexityDetector } from "@/core/service/dataManageService/ComplexityDetector";
import type { ContentSearch } from "@/core/service/dataManageService/contentSearchEngine/contentSearchEngine";
import type { CopyEngine } from "@/core/service/dataManageService/copyEngine/copyEngine";
import type { Effects } from "@/core/service/feedbackService/effectEngine/effectMachine";
import { StageStyleManager } from "@/core/service/feedbackService/stageStyle/StageStyleManager";
import type { Camera } from "@/core/stage/Camera";
import type { Canvas } from "@/core/stage/Canvas";
import { GraphMethods } from "@/core/stage/stageManager/basicMethods/GraphMethods";
import { SectionMethods } from "@/core/stage/stageManager/basicMethods/SectionMethods";
import type { LayoutManualAlign } from "@/core/stage/stageManager/concreteMethods/layoutManager/layoutManualAlignManager";
import type { AutoAlign } from "@/core/stage/stageManager/concreteMethods/StageAutoAlignManager";
import type { DeleteManager } from "@/core/stage/stageManager/concreteMethods/StageDeleteManager";
import type { EntityMoveManager } from "@/core/stage/stageManager/concreteMethods/StageEntityMoveManager";
import type { StageUtils } from "@/core/stage/stageManager/concreteMethods/StageManagerUtils";
import type { MultiTargetEdgeMove } from "@/core/stage/stageManager/concreteMethods/StageMultiTargetEdgeMove";
import type { NodeAdder } from "@/core/stage/stageManager/concreteMethods/StageNodeAdder";
import type { NodeConnector } from "@/core/stage/stageManager/concreteMethods/StageNodeConnector";
import type { StageNodeRotate } from "@/core/stage/stageManager/concreteMethods/stageNodeRotate";
import type { StageObjectColorManager } from "@/core/stage/stageManager/concreteMethods/StageObjectColorManager";
import type { StageObjectSelectCounter } from "@/core/stage/stageManager/concreteMethods/StageObjectSelectCounter";
import type { SectionInOutManager } from "@/core/stage/stageManager/concreteMethods/StageSectionInOutManager";
import type { SectionPackManager } from "@/core/stage/stageManager/concreteMethods/StageSectionPackManager";
import type { SerializedDataAdder } from "@/core/stage/stageManager/concreteMethods/StageSerializedAdder";
import type { TagManager } from "@/core/stage/stageManager/concreteMethods/StageTagManager";
import { HistoryManager } from "@/core/stage/stageManager/StageHistoryManager";
import type { StageManager } from "@/core/stage/stageManager/StageManager";
import { StageObject } from "@/core/stage/stageObject/abstract/StageObject";
import { projectsAtom, store } from "@/state";
import { deserialize, serialize } from "@graphif/serializer";
import { Decoder, Encoder } from "@msgpack/msgpack";
import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader, ZipWriter } from "@zip.js/zip.js";
import { URI } from "vscode-uri";

if (import.meta.hot) {
  import.meta.hot.accept();
}

/**
 * “工程”
 * 一个标签页对应一个工程，一个工程只能对应一个URI
 * 一个工程可以加载不同的服务，类似vscode的扩展（Extensions）机制
 */
export class Project {
  static readonly latestVersion = 18;
  /**
   * 仅开发环境有效，用于热重载服务
   */
  static readonly serviceId2ModulePathMap = new Map<string, string>();
  static {
    if (import.meta.hot) {
      Object.entries(
        import.meta.glob("./**/*.tsx", {
          eager: true,
          import: "default",
          // 每个服务类上面都会有@service装饰器，所以只要用正则匹配一下就可以了，所有不用解析模块
          query: "?raw",
        }),
      ).forEach(([k, v]) => {
        const idMatch = (v as string).match(/^@service\("([a-zA-Z]+)"\)$/m);
        if (!idMatch) {
          return;
        }
        const id = idMatch[1];
        // console.debug("[Project] 发现服务: %s (%s)", id, k);
        this.serviceId2ModulePathMap.set(id, k);
      });
    }
  }

  private readonly services = new Map<string, Service>();
  private readonly tickableServices: Service[] = [];
  private readonly fileSystemProviders = new Map<string, FileSystemProvider>();
  private rafHandle = -1;
  private _uri: URI;
  public state: ProjectState = ProjectState.Unsaved;
  public stage: StageObject[] = [];
  /**
   * 创建Encoder对象比直接用encode()快
   * @see https://github.com/msgpack/msgpack-javascript#reusing-encoder-and-decoder-instances
   */
  private encoder = new Encoder();
  private decoder = new Decoder();

  constructor(
    /**
     * 工程文件的URI
     * 之所以从“路径”改为了“URI”，是因为要为后面的云同步功能做铺垫。
     * 普通的“路径”无法表示云盘中的文件，而URI可以。
     * 同时，草稿文件也从硬编码的“Project Graph”特殊文件路径改为了协议为draft、内容为UUID的URI。
     * @see https://code.visualstudio.com/api/references/vscode-api#workspace.workspaceFile
     */
    uri: URI,
  ) {
    this._uri = uri;
  }
  /**
   * 创建一个草稿工程
   * URI为draft:UUID
   */
  static newDraft(): Project {
    const num = store.get(projectsAtom).filter((p) => p.isDraft).length + 1;
    const uri = URI.parse("draft:" + num);
    return new Project(uri);
  }

  /**
   * 立刻加载一个新的服务
   */
  loadService(service: { id?: string; new (...args: any[]): any }) {
    if (!service.id) {
      service.id = crypto.randomUUID();
      console.warn("[Project] 服务 %o 未指定 ID，自动生成：%s", service, service.id);
    }
    const inst = new service(this);
    this.services.set(service.id, inst);
    if ("tick" in inst) {
      this.tickableServices.push(inst);
    }
    this[service.id as keyof this] = inst as this[keyof this];
    // TODO: 现在的热重载用不了
    if (import.meta.hot) {
      // 获取服务所在的模块路径
      // 这也是为什么要求传递一个类而不是实例的原因
      const modulePath = Project.serviceId2ModulePathMap.get(service.id);
      if (!modulePath) {
        console.warn("[Project] 未找到服务 %s 的模块路径，将无法热重载该服务", service.id);
        return;
      }
      import.meta.hot.accept(modulePath, (module) => {
        console.debug("[Project] 热重载服务: %s (%s)", service.id, modulePath);
        // 先卸载原来的服务
        if (service.id) {
          this.disposeService(service.id);
        }
        // 找到模块中包含id属性的对象
        const newService = Object.values(module!).find((v) => v.id === service.id);
        if (!newService) {
          console.warn("[Project] %s 热重载无效: 新的模块中未找到服务类", service.id);
          return;
        }
        // 重新加载服务
        this.loadService(newService);
      });
    }
  }
  /**
   * 立刻销毁一个服务
   */
  disposeService(serviceId: string) {
    const service = this.services.get(serviceId);
    if (service) {
      service.dispose?.();
      this.services.delete(serviceId);
      this.tickableServices.splice(this.tickableServices.indexOf(service), 1);
    }
  }

  /**
   * 服务加载完成后再调用
   */
  async init() {
    if (await this.fs.exists(this.uri)) {
      const fileContent = await this.fs.read(this.uri);
      const reader = new ZipReader(new Uint8ArrayReader(fileContent));
      const entries = await reader.getEntries();
      for (const entry of entries) {
        if (entry.filename === "stage.msgpack") {
          const stageRawData = await entry.getData!(new Uint8ArrayWriter());
          const decoded = this.decoder.decode(stageRawData) as any[];
          for (const serializedStageObject of decoded) {
            const stageObject = deserialize(serializedStageObject, this);
            this.stage.push(stageObject);
          }
        }
      }
    }
  }

  loop() {
    if (this.rafHandle !== -1) return;
    const animationFrame = () => {
      this.tick();
      this.rafHandle = requestAnimationFrame(animationFrame.bind(this));
    };
    animationFrame();
  }
  pause() {
    if (this.rafHandle === -1) return;
    cancelAnimationFrame(this.rafHandle);
    this.rafHandle = -1;
  }
  private tick() {
    for (const service of this.tickableServices) {
      try {
        service.tick?.();
      } catch (e) {
        console.error("[%s] %o", service, e);
        this.tickableServices.splice(this.tickableServices.indexOf(service), 1);
      }
    }
  }
  /**
   * 用户关闭标签页时，销毁工程
   */
  async dispose() {
    cancelAnimationFrame(this.rafHandle);
    const promises: Promise<void>[] = [];
    for (const service of this.services.values()) {
      const result = service.dispose?.();
      if (result instanceof Promise) {
        promises.push(result);
      }
    }
    await Promise.allSettled(promises);
    this.services.clear();
    this.tickableServices.length = 0;
  }

  /**
   * 获取某个服务的实例
   */
  getService<T extends keyof this & string>(serviceId: T): this[T] {
    return this.services.get(serviceId) as this[T];
  }

  get isDraft() {
    return this.uri.scheme === "draft";
  }
  get uri() {
    return this._uri;
  }
  set uri(uri: URI) {
    this._uri = uri;
    this.state = ProjectState.Unsaved;
  }

  /**
   * 将文件暂存到数据目录中（通常为~/.local/share）
   * ~/.local/share/liren.project-graph/stash/<normalizedUri>
   * @see https://code.visualstudio.com/blogs/2016/11/30/hot-exit-in-insiders
   *
   * 频繁用msgpack序列化不会卡吗？
   * 虽然JSON.stringify()在V8上面速度和msgpack差不多
   * 但是要考虑跨平台，目前linux和macos用的都是webkit，目前还没有JavaScriptCore相关的benchmark
   * 而且考虑到以后会把图片也放进文件里面，JSON肯定不合适了
   * @see https://github.com/msgpack/msgpack-javascript#benchmark
   */
  async stash() {
    // TODO: stash
    // const stashFilePath = await join(await appLocalDataDir(), "stash", Base64.encode(this.uri.toString()));
    // const encoded = this.encoder.encodeSharedRef(this.data);
    // await writeFile(stashFilePath, encoded);
  }
  async save() {
    const serializedStage = this.stage.map((stageObject) => serialize(stageObject));
    const encodedStage = this.encoder.encodeSharedRef(serializedStage);
    const uwriter = new Uint8ArrayWriter();
    const writer = new ZipWriter(uwriter);
    writer.add("stage.msgpack", new Uint8ArrayReader(encodedStage));
    await writer.close();
    const fileContent = await uwriter.getData();
    await this.fs.write(this.uri, fileContent);
  }

  registerFileSystemProvider(scheme: string, provider: { new (...args: any[]): FileSystemProvider }) {
    this.fileSystemProviders.set(scheme, new provider(this));
  }
  get fs(): FileSystemProvider {
    return this.fileSystemProviders.get(this.uri.scheme)!;
  }
}

declare module "./Project" {
  /*
   * 不直接在class中定义的原因
   * 在class中定义的话ts会报错，因为它没有初始值并且没有在构造函数中赋值
   * 在这里用语法糖定义就能优雅的绕过这个限制
   * 服务加载的顺序在调用registerService()时确定
   */
  interface Project {
    canvas: Canvas;
    inputElement: InputElement;
    keyBinds: KeyBinds;
    controllerUtils: ControllerUtils;
    autoComputeUtils: AutoComputeUtils;
    renderUtils: RenderUtils;
    worldRenderUtils: WorldRenderUtils;
    historyManager: HistoryManager;
    stageManager: StageManager;
    camera: Camera;
    effects: Effects;
    autoCompute: AutoCompute;
    rectangleSelect: RectangleSelect;
    stageNodeRotate: StageNodeRotate;
    complexityDetector: ComplexityDetector;
    aiEngine: AIEngine;
    copyEngine: CopyEngine;
    autoLayout: AutoLayout;
    autoLayoutFastTree: AutoLayoutFastTree;
    layoutManualAlign: LayoutManualAlign;
    autoAlign: AutoAlign;
    mouseInteraction: MouseInteraction;
    contentSearch: ContentSearch;
    deleteManager: DeleteManager;
    nodeAdder: NodeAdder;
    entityMoveManager: EntityMoveManager;
    stageUtils: StageUtils;
    multiTargetEdgeMove: MultiTargetEdgeMove;
    nodeConnector: NodeConnector;
    stageObjectColorManager: StageObjectColorManager;
    stageObjectSelectCounter: StageObjectSelectCounter;
    sectionInOutManager: SectionInOutManager;
    sectionPackManager: SectionPackManager;
    tagManager: TagManager;
    keyboardOnlyEngine: KeyboardOnlyEngine;
    keyboardOnlyGraphEngine: KeyboardOnlyGraphEngine;
    keyboardOnlyTreeEngine: KeyboardOnlyTreeEngine;
    selectChangeEngine: SelectChangeEngine;
    textRenderer: TextRenderer;
    imageRenderer: ImageRenderer;
    shapeRenderer: ShapeRenderer;
    entityRenderer: EntityRenderer;
    edgeRenderer: EdgeRenderer;
    multiTargetUndirectedEdgeRenderer: MultiTargetUndirectedEdgeRenderer;
    curveRenderer: CurveRenderer;
    svgRenderer: SvgRenderer;
    drawingControllerRenderer: DrawingControllerRenderer;
    collisionBoxRenderer: CollisionBoxRenderer;
    entityDetailsButtonRenderer: EntityDetailsButtonRenderer;
    straightEdgeRenderer: StraightEdgeRenderer;
    symmetryCurveEdgeRenderer: SymmetryCurveEdgeRenderer;
    verticalPolyEdgeRenderer: VerticalPolyEdgeRenderer;
    portalNodeRenderer: PortalNodeRenderer;
    sectionRenderer: SectionRenderer;
    svgNodeRenderer: SvgNodeRenderer;
    textNodeRenderer: TextNodeRenderer;
    urlNodeRenderer: UrlNodeRenderer;
    backgroundRenderer: BackgroundRenderer;
    searchContentHighlightRenderer: SearchContentHighlightRenderer;
    renderer: Renderer;
    controller: Controller;
    stageExport: StageExport;
    stageExportPng: StageExportPng;
    StageExportSvg: StageExportSvg;
    generateFromFolder: GenerateFromFolder;
    serializedDataAdder: SerializedDataAdder;
    keyBindsRegistrar: KeyBindsRegistrar;
    sectionMethods: SectionMethods;
    graphMethods: GraphMethods;
    stageStyleManager: StageStyleManager;
  }
}

export enum ProjectState {
  /**
   * “已保存”
   * 已写入到原始文件中
   * 已上传到云端
   */
  Saved,
  /**
   * "已暂存"
   * 未写入到原始文件中，但是已经暂存到数据目录
   * 未上传到云端，但是已经暂存到本地
   */
  Stashed,
  /**
   * “未保存”
   * 未写入到原始文件中，也未暂存到数据目录（真·未保存）
   * 未上传到云端，也未暂存到本地
   */
  Unsaved,
}

/**
 * 装饰器
 * @example
 * @service("renderer")
 * class Renderer {}
 *
 * 装饰了这个类之后，这个类会多一个id属性（静态属性），值为"renderer"
 * 可以通过 Renderer.id 获取到这个值
 */
export const service =
  (id: string) =>
  <
    T extends {
      [x: string | number | symbol]: any;
      id?: string;
      new (...args: any[]): any;
    },
  >(
    target: T,
  ): T & { id: string } => {
    target.id = id;
    return target as T & { id: string };
  };
