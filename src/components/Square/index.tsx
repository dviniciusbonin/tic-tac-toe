import './styles.css';


type Props = {
    value: any;
    onClick: () => void;
    disabled?: boolean;
}

export function Square({value, onClick, disabled = false}: Props) {
    console.log({disabled})

    const handleClick = () => {
        if(!disabled) {
            onClick();
        }
    }
    return(
        <div className="container-square" onClick={handleClick}>
            {value}
        </div>
    )
}