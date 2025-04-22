import Image from 'next/image';
import './image.scss';

export function AvatarOfMe() {
    return <Image className="image" src="/img/avatar.jpg" alt="гигачад" width="200" height="200" />;
}
