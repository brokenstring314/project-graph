import { Vector } from "@graphif/data-structures";
import { Dialog } from "@/components/dialog";
import { Project } from "@/core/Project";
import { ControllerClass } from "@/core/service/controlService/controller/ControllerClass";

/**
 * 包含编辑节点文字，编辑详细信息等功能的控制器
 *
 * 当有节点编辑时，会把摄像机锁定住
 */
export class ControllerSectionEdit extends ControllerClass {
  constructor(protected readonly project: Project) {
    super(project);
  }

  mouseDoubleClick = (event: MouseEvent) => {
    if (event.button !== 0) {
      return;
    }
    const firstHoverSection = this.project.mouseInteraction.firstHoverSection;
    if (!firstHoverSection) {
      return;
    }

    // 编辑文字
    this.project.controllerUtils.editSectionTitle(firstHoverSection);
    return;
  };

  mousemove = (event: MouseEvent) => {
    const worldLocation = this.project.renderer.transformView2World(new Vector(event.clientX, event.clientY));
    this.project.mouseInteraction.updateByMouseMove(worldLocation);
  };

  keydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const isHaveSectionSelected = this.project.stageManager.getSections().some((section) => section.isSelected);
      if (!isHaveSectionSelected) {
        return;
      }
      Dialog.show({
        title: "重命名",
        input: true,
      }).then(({ button, value }) => {
        if (button === "确定") {
          if (value) {
            for (const section of this.project.stageManager.getSections()) {
              if (section.isSelected) {
                section.rename(value);
              }
            }
          }
        }
      });
    }
  };
}
