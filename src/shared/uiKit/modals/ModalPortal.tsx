import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { ReactNodeType } from 'shared/type';
import './modals.scss';

type Props = ReactNodeType & {
    className?: string;
};

export const ModalPortal = forwardRef<HTMLDivElement, Props>(({ children, className }, ref) => {
    const portalElement = (
        <div className="portal-modal-background">
            <div ref={ref} className={`portal-modal-inner ${className}`}>
                {children}
            </div>
        </div>
    );

    return createPortal(portalElement, document.body);
});
