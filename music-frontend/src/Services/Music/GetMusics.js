import axios from 'axios';
import { domainName } from '../../Domain/DomainName';

function GetMusics() {
    return (
        axios.get(`${domainName}/api/music/views/`)
            .then(res => res.data)
            .catch(error => console.log(error))
    )
}
export default GetMusics;