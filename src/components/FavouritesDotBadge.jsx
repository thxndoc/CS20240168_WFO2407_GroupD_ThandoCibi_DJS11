import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";

export default function FavouritesDotBadge() {
    return (
        <div className='favourite'>
            <FontAwesomeIcon icon={faHeart} className='heart' />
            <span className="dot"></span>       
        </div>
    );
}