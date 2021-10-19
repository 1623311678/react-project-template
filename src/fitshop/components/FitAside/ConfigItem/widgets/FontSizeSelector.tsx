import React, { useState, useEffect, useCallback, useMemo } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: 0,
            width: "100%",
            height: 36
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

interface IFontSizeSelector{
    value: string
    handleSelector: (v:string)=>void
    title: string,
    type?: string | 'title' | 'subTitle'
}

const fontsizeList__title = [
    { label: '32px', value: '32px' },
    { label: '30px', value: '30px' },
    { label: '28px', value: '28px' },
    { label: '26px', value: '26px' },
    { label: '24px', value: '24px' },
    { label: '22px', value: '22px' },
    { label: '20px', value: '20px' },
    { label: '18px', value: '18px' },
    { label: '16px', value: '16px' },
]
const fontsizeList__subTitle = [
    { label: '28px', value: '28px' },
    { label: '26px', value: '26px' },
    { label: '24px', value: '24px' },
    { label: '22px', value: '22px' },
    { label: '20px', value: '20px' },
    { label: '18px', value: '18px' },
    { label: '16px', value: '16px' },
    { label: '14px', value: '14px' },
    { label: '12px', value: '12px' },

]

const FontSizeSelector: React.FC<IFontSizeSelector> = props => {
    const classes = useStyles();

    const [value ,setValue] = useState(props.value)
    function handleValueChange(e){
        const v = e.target.value
        console.log(v, 'vvvv')
        setValue(v)
        props.handleSelector(e)
    }
    const fontsizeList = props.type == 'title' ? fontsizeList__title : fontsizeList__subTitle
    return (
        <div className="module__item">
            <div className="t14 mb-8">{props.title}</div>
            <FormControl size="small" variant="outlined" className={classes.formControl}>
                <Select
                    name="title_size"
                    value={value}
                    onChange={handleValueChange}
                >
                    {fontsizeList.map(f => <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}


export default FontSizeSelector
