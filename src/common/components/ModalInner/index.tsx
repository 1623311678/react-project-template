
import makeStyles from "@material-ui/core/styles/makeStyles";
import classNames from "classnames";
import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import "./index.scss"
const useStyles = makeStyles(
    theme => ({
        content: {
        },
        expandButton: {
        },
        root: {

        },
        title: {

        },
        titleText: {
        }
    }),
    {
        name: "ModalInner"
    }
);

export interface ModalInnerProps {
    className?: string;
    initialShow?: boolean;
    title?: string;
    okcb?: () => void;
    cancelcb?: () => void;
}

const ModalInner: React.FC<ModalInnerProps> = ({
    children,
    className,
    initialShow,
    title,
    ...props
}) => {
    const classes = useStyles({});
    const [show, setShow] = React.useState(!!initialShow);

    const handleOk = () => {
        setShow(false)
        props.okcb()
    }
    const handleCancel = () => {
        setShow(false)
        props.cancelcb()
    }
    useEffect(() => {
        // console.log(initialShow, 'initialShow')
        setShow(initialShow)
    }, [initialShow])

    return (
        <div>
            {show ?
                <div className={`${classNames(classes.root, className)} ${show && 'show'} modal-inner-root`}>
                    <div className="h-wrapper">
                        <div className="title">
                            {title || '选择类别'}
                        </div>

                        <CloseIcon className="icon-close" onClick={handleCancel} />
                    </div>
                    {children}
                    <div className="b-wrapper">
                        <Button variant="contained" color="primary" onClick={handleOk}>
                            确定
                        </Button>
                    </div>

                </div> : ""
            }
        </div>
    );
};

ModalInner.displayName = "ModalInner";
export default ModalInner;
