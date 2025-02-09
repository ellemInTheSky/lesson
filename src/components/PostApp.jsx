import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, removePost, editPost, updateInputValue } from "../store/slice/postSlice";

function PostApp() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  
  const handleAddPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    dispatch(addPost({ title: newTitle, content: newContent }));
    setNewTitle("");
    setNewContent("");
  };


  const handleRemovePost = (id) => {
    dispatch(removePost(id));
  };


  const handleStartEditing = (post) => {
    setEditId(post.id);
    setEditData({ title: post.title, content: post.content });
  };


  const handleSaveEdit = () => {
    dispatch(
      editPost({ id: editId, title: editData.title, content: editData.content })
    );
    setEditId(null);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Посты</h2>


      <input
        type="text"
        className="border p-1 w-full mb-2"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Заголовок"
      />
      <textarea
        className="border p-1 w-full mb-2"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Текст"
      />
      <button
        className="bg-blue-500 text-white px-3 py-1"
        onClick={handleAddPost}>
        Добавить
      </button>


      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-2">
            {editId === post.id ? (
              <div>
                <input
                  type="text"
                  className="border p-1 w-full mb-1"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
                <textarea
                  className="border p-1 w-full mb-1"
                  value={editData.content}
                  onChange={(e) =>
                    setEditData({ ...editData, content: e.target.value })
                  }
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-1"
                  onClick={handleSaveEdit}>
                  Сохранить
                </button>
                <button
                  className="bg-gray-400 text-white px-2 py-1"
                  onClick={() => setEditId(null)}>
                  Отмена
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm">{post.content}</p>
                <input
                  type="text"
                  className="border p-1 w-full mt-1"
                  value={post.inputValue}
                  onChange={(e) =>
                    dispatch(
                      updateInputValue({
                        id: post.id,
                        inputValue: e.target.value,
                      })
                    )
                  }
                  placeholder="desc"
                />
                <div className="mt-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1"
                    onClick={() => handleStartEditing(post)}>
                    Редактировать
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1"
                    onClick={() => handleRemovePost(post.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostApp;
