import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function DeleteMusic(musicId, accessToken) {
    return (axios.delete(`${domainName}/api/music/delete/${musicId}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": 'multipart/form-data'
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default DeleteMusic;