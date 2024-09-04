import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function PutMusic(musicId, accessToken, formData) {
    return (axios.put(`${domainName}/api/music/update/${musicId}/`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": 'multipart/form-data'
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default PutMusic;