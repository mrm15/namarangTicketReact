import {Portal} from "../Portal/Portal.tsx";
import ModalView from "./ModalView.tsx";

const Modal = (props) => {
    const {closeModal} = props
    const isMobile = window.innerWidth <= 768

    return (
        <Portal>
            <div
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    // top: "50%",
                    // left: "50%",
                    // transform:" translate(-50%, -50%)",
                    zIndex: 100,
                    background: "rgba(0,0,0,0.5)"
                }}
                onClick={closeModal}
            />
            <div
                className={'ease-in-out ' +   `  ${isMobile &&  "w-full overflow-scroll"}`}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 101,
                    maxHeight: "100vh",
                    // overflowY:"auto",

                }}
            >

                <ModalView {...props}>
                    {props.children}
                </ModalView>

            </div>
        </Portal>
    );
};

export default Modal;
