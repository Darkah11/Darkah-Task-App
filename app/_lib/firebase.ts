import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../_config/firebase";
import { Task } from "../_types/Task";
import { Board, BoardWithId } from "../_types/Board";

export const createBoard = async (
  title: string,
  userId: string | undefined,
) => {
  if (!userId) throw new Error("Invalid user");

  const boardsRef = collection(db, "users", userId, "boards");

  const newBoard = await addDoc(boardsRef, {
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return newBoard.id;
};
export const editBoard = async (
  title: string,
  userId: string | undefined,
  boardId: string
) => {
  if (!userId) throw new Error("Invalid user");

  const boardsRef = doc(db, "users", userId, "boards", boardId);

  const newBoard = await updateDoc(boardsRef, {
    title,
    updatedAt: new Date().toISOString(),
  });

  return newBoard;
};

export const deleteBoard = async (
  boardId: string,
  userId: string | undefined,
) => {
  if (!userId) return null;
  try {
    if (!confirm("Are you sure you want to delete this board?")) return;
    const boardRef = doc(
      db,
      "users",
      userId,
      "boards",
      boardId
    );
    await deleteDoc(boardRef);

    alert("✅ Board deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Error deleting board");
  }
};

export const getBoards = async (userId: string | undefined) => {
  //   const user = auth.currentUser;
  // if (!userId) return [];
  if (!userId) return null;

  const boardsRef = collection(db, "users", userId, "boards");
  const snapshot = await getDocs(boardsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Board),
  }));
};

export async function getBoardById(
  boardId: string,
  userId: string | undefined,
): Promise<BoardWithId | null> {
  if (!userId) throw new Error("Invalid user");
  if (boardId === "") throw new Error("Invalid Board");

  const boardRef = doc(db, "users", userId, "boards", boardId);

  const snapshot = await getDoc(boardRef);

  if (!snapshot.exists()) {
    return null; // board not found
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Board),
  };
}

export async function createTask(
  boardId: string,
  userId: string | undefined,
  task: Omit<Task, "createdAt" | "updatedAt">,
) {
  // const user = auth.currentUser;
  if (!userId) throw new Error("Invalid user");
  if (boardId === "") throw new Error("Invalid Board");

  const tasksRef = collection(db, "users", userId, "boards", boardId, "tasks");

  const now = new Date().toISOString();

  await addDoc(tasksRef, {
    ...task,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getTasks(boardId: string, userId: string | undefined) {
  if (!userId) throw new Error("Invalid user");
  if (boardId === "") throw new Error("Invalid Board");

  const tasksRef = collection(db, "users", userId, "boards", boardId, "tasks");

  const snapshot = await getDocs(tasksRef);

  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Task),
  }));
  return tasks;
}
export async function getTaskById(
  boardId: string,
  userId: string | undefined,
  taskId: string,
) {
  if (!userId) throw new Error("Invalid user");
  if (boardId === "") return;

  const taskRef = doc(db, "users", userId, "boards", boardId, "tasks", taskId);

  const snapshot = await getDoc(taskRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Task),
  };
}

export const editTask = async (
  boardId: string,
  userId: string | undefined,
  taskId: string,
  body: Task,
) => {
  try {
    if (!userId) throw new Error("Invalid user");
    if (boardId === "") throw new Error("Invalid Board");

    const updatedTaskData = {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      updatedAt: new Date().toISOString(),
      dueDate: body.dueDate || "",
      subtasks: body.subtasks || null,
    };

    // 3️⃣ Update Firestore document
    const taskRef = doc(
      db,
      "users",
      userId,
      "boards",
      boardId,
      "tasks",
      taskId,
    );
    await updateDoc(taskRef, updatedTaskData);

    alert("✅ Task updated successfully!");
  } catch (err) {
    console.error("Edit task error:", err);
    alert("Error updating task");
  } finally {
    console.log("editTask finished");
  }
};

export const deleteTask = async (
  boardId: string,
  userId: string | undefined,
  taskId: string,
) => {
  if (!userId) return null;
  if (boardId === "") return null;
  try {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const taskRef = doc(
      db,
      "users",
      userId,
      "boards",
      boardId,
      "tasks",
      taskId,
    );
    await deleteDoc(taskRef);

    alert("✅ Task deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Error deleting task");
  }
};
