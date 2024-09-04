import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function PostMusic(accessToken, formData) {
    return (axios.post(`${domainName}/api/music/`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": 'multipart/form-data'
        }
    }).then(res => res.data)
        .catch(error => console.log(error)))
}

export default PostMusic;