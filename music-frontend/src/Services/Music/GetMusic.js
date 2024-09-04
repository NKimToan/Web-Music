import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetMusic(musicId) {
    return (
        axios.get(`${domainName}/api/music/view/${musicId}/`)
            .then(res => res.data)
            .catch(error => console.log(error.status))
    )
}
export default GetMusic;