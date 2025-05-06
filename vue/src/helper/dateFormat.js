import moment from 'moment';

function dateFormat(iso) {
    return moment(iso).format('YYYY-MM-DD');
}

export default dateFormat