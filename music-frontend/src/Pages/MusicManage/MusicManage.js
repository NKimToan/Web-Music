import { useState, useEffect } from "react";
import { getToken } from "../../Services/TokenServices/TokenService";
import GetMusics from "../../Services/Music/GetMusics";
import DeleteMusic from "../../Services/Music/DeleteMusic"
import GetTopics from "../../Services/Topic/GetTopics";
import AddMusicModal from "./AddMusicModal";
import UpdateMusicModal from "./UpdateMusicModal";

function MusicManage() {

    const [musics, setMusics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editMusic, setEditMusic] = useState(false);

    document.title = "Quản lý bài hát";
    useEffect(() => {
        const accessToken = getToken();
        GetMusics(accessToken)
            .then(data => {
                setMusics(data);
            })
            .catch(error => console.log(error));

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

    const handleUpdate = (e, musicId) => {
        e.preventDefault();
        setEditMusic(musicId);
        setEditModalShow(true);
    }

    const handleDelete = (e, musicId) => {
        e.preventDefault();
        if (window.confirm("Do you want to delete this topic?")) {
            const accessToken = getToken();
            DeleteMusic(musicId, accessToken)
                .then(result => { setIsUpdated(true) });
        }
    }

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return <div className="container">
        <button className="btn btn-primary mt-4" onClick={handleAdd}>Thêm bài hát</button>
        <AddMusicModal
            show={addModalShow}
            onHide={AddModelClose}
            setIsUpdated={setIsUpdated}
            topics={topics}
        />
        <main className="table-responsive-md table-responsive-lg mt-4 text-center my-4">
            <table className="table table-striped table-hover">
                <thead className="p-5 table-primary bg-opacity-50">
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên bài hát</th>
                        <th>Ca sĩ</th>
                        <th>Link</th>
                        <th>Chủ đề</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {musics.map((music, id) => (
                        <tr key={id}>
                            <td >
                                <img src={`${music.image}`} alt="" className="song-image rounded ms-2" />
                            </td>
                            <td>{music.name}</td>
                            <td>{music.singer}</td>
                            <td>
                                <audio controls src={`${music.music}`} type="audio/mpeg" />
                            </td>
                            <td>{music.topic.name}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={event => handleUpdate(event, music.id)}>Update</button>
                                <UpdateMusicModal
                                    show={editModalShow}
                                    setIsUpdated={setIsUpdated}
                                    music={editMusic}
                                    onHide={EditModelClose}
                                    musics={musics}
                                    musicId={music.id === editMusic}
                                    topics={topics} />
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={event => handleDelete(event, music.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >
    </div >
}

export default MusicManage;