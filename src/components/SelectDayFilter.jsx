import * as React from 'react';
import {DateRangePicker} from 'react-date-range';
import {startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, addDays} from 'date-fns';
import {uz} from 'date-fns/locale';


import {
    Box,
    Stack,
    Paper,
    Popover,
    TextField,
} from '@mui/material';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export default function MuiLikeRangePicker({value, setValue}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const now = new Date();

    const presets = [
        {label: "Bugun", startDate: now, endDate: now},
        {label: "Hafta", startDate: startOfWeek(now, {weekStartsOn: 1}), endDate: endOfWeek(now, {weekStartsOn: 1})},
        {label: "Oy", startDate: startOfMonth(now), endDate: endOfMonth(now)},
        {label: "Yil", startDate: startOfYear(now), endDate: endOfYear(now)},
    ];

    const uzbekStaticRanges = presets.map(p => ({
        label: p.label,
        range: () => ({startDate: p.startDate, endDate: p.endDate}),
        isSelected: (range) =>
            range.startDate.getTime() === p.startDate.getTime() &&
            range.endDate.getTime() === p.endDate.getTime()
    }));

    const handleChange = (item) => {
        const {startDate, endDate} = item.range1;
        setValue({
            startDate:startDate,
            endDate:endDate,
        })


        const isPreset = presets.some(p =>
            p.startDate.getTime() === startDate.getTime() &&
            p.endDate.getTime() === endDate.getTime()
        );

        if (isPreset) {
            setAnchorEl(false);
            return;
        }

        if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
            setAnchorEl(false);
        }

        console.log('adw')
    };

    console.log(value,'value')
    return (
        <>
            <TextField
                fullWidth
                value={`${value?.startDate.toLocaleDateString()} – ${value?.endDate.toLocaleDateString()}`}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                InputProps={{readOnly: true}}
            />

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Paper>
                    <Stack direction="row">
                        <Box>
                            <DateRangePicker
                                onChange={handleChange}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                ranges={[value]}
                                direction="horizontal"
                                locale={uz}
                                staticRanges={uzbekStaticRanges} // faqat label va range
                                inputRanges={[]}
                            />
                        </Box>
                    </Stack>
                </Paper>
            </Popover>
        </>
    );
}