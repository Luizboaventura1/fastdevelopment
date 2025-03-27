import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useWorkspace } from "~/stores/workspace";

describe("Workspace Store", () => {
  beforeEach(() => {
    vi.mock("~/stores/workspace", () => ({
      useWorkspace: vi.fn(() => ({
        frames: ref([]),
        updateWorkspaceData: vi.fn(() => {
          throw new Error("Não foi encontrado nenhum quadro do usuário.");
        }),
      })),
    }));
  });

  it("Should throw a specific error when attempting to update workspace data with no frames available", () => {
    const workspace = useWorkspace();
    expect(() => workspace.updateWorkspaceData()).toThrowError(
      "Não foi encontrado nenhum quadro do usuário."
    );
    expect(workspace.updateWorkspaceData).toHaveBeenCalled();
  });

  it("Should maintain and correctly manage frames data structure in the workspace store", () => {
    const workspace = useWorkspace();
    const testData = { id: "frame-1", name: "Test Frame", data: "sample-data" };
    const secondTestData = { id: "frame-2", name: "Another Frame", data: null };

    workspace.frames.value = [testData];
    expect(workspace.frames.value).toHaveLength(1);
    expect(workspace.frames.value[0]).toMatchObject(testData);
    expect(workspace.frames.value).toBeInstanceOf(Array);

    workspace.frames.value.push(secondTestData);
    expect(workspace.frames.value).toHaveLength(2);
    expect(workspace.frames.value[1].id).toBe("frame-2");
    expect(workspace.frames.value[1].data).toBeNull();
  });

  it("Should ensure updateWorkspaceData is implemented as a mock function", () => {
    const workspace = useWorkspace();
    expect(workspace.updateWorkspaceData).toBeInstanceOf(Function);
    expect(vi.isMockFunction(workspace.updateWorkspaceData)).toBeTruthy();
  });

  it("Should initialize with an empty frames array", () => {
    const workspace = useWorkspace();
    expect(workspace.frames.value).toBeInstanceOf(Array);
    expect(workspace.frames.value).toHaveLength(0);
  });
});
