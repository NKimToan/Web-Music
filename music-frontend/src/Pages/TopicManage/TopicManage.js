import { useState, useEffect } from "react";
import { getToken } from "../../Services/TokenServices/TokenService";
import GetTopics from "../../Services/Topic/GetTopics";
import DeleteTopic from "../../Services/Topic/DeleteTopic";
import AddTopicModal from "./AddTopicModal";
import UpdateTopicModal from "./UpdateTopicModal";

function TopicManage() {

    const [topics, setTopics] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editTopic, setEditTopic] = useState(false);

    document.title = "Quản lý chủ đề";
    useEffect(() => {
        const accessToken = getToken();
        GetTopics(accessToken)
            .then(data => {
                setTopics(data);
            })
            .catch(error => console.log(error));


        return (() => { setIsUpdated(false) })

    }, [isUpdated])

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    }

    const handleUpdate = (e, topicId) => {
        e.preventDefault();
        setEditTopic(topicId);
        setEditModalShow(true);
    }

    const handleDelete = (e, topicId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this topic?")) {
            const accessToken = getToken();
            DeleteTopic(topicId, accessToken)
                .then(result => { setIsUpdated(true) });
        }
    }

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return <div className="container">
        <button className="btn btn-primary mt-4" onClick={handleAdd}>Thêm chủ đề</button>
        <AddTopicModal
            show={addModalShow}
            onHide={AddModelClose}
            setIsUpdated={setIsUpdated} />
        <main className="table-responsive-md table-responsive-lg mt-4 text-center my-4">
            <table className="table table-striped table-hover">
                <thead className="p-5 table-primary bg-opacity-50">
                    <tr>
                        <th>Id</th>
                        <th>Tên thể loại</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic, id) => (
                        <tr key={id}>
                            <td>{topic.id}</td>
                            <td>{topic.name}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={event => handleUpdate(event, topic.id)}>Update</button>
                                <UpdateTopicModal
                                    show={editModalShow}
                                    setIsUpdated={setIsUpdated}
                                    topic={editTopic}
                                    onHide={EditModelClose}
                                    topics={topics}
                                    topicId={topic.id === editTopic} />
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, topic.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >
    </div>
}

export default TopicManage;
