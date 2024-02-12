import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import RadioButtons from './RadioButtons';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import FileUpload from './FileUpload';
import InputColor from "./InputColor.tsx";

const controlMap = {
    input: Input,
    textarea: Textarea,
    select: Select,
    radio: RadioButtons,
    checkbox: CheckboxGroup,
    date: DatePicker,
    file: FileUpload,
    color: InputColor,
};

function FormikControl(props) {

    const {control, isShow, ...rest} = props;
    const ControlComponent = controlMap[control];

    if (isShow !== false) {

        return ControlComponent ? <ControlComponent {...rest} /> : <div>
            <br/>
            یه مورد ناشناخته

        </div>;
    } else {
        return <></>
    }
}

export default FormikControl;
