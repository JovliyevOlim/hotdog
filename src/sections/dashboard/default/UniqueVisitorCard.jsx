import {useEffect, useState} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import {useDispatch, useSelector} from "react-redux";
import {getReportProfitExpenseRequest} from "../../../api/report/reportSlice";

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard() {
  const dispatch = useDispatch();
  const [view, setView] = useState('month');
  const {reportProfitExpense, isSuccess, isLoading} = useSelector((state) => state.report);


  useEffect(() => {
     dispatch(getReportProfitExpenseRequest({
       mode:view
     }));
  }, [view]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <Typography variant="h5">Tahlil</Typography>
        </Grid>
        <Grid>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Button
              size="small"
              onClick={() => setView('month')}
              color={view === 'month' ? 'primary' : 'secondary'}
              variant={view === 'month' ? 'outlined' : 'text'}
            >
              Oy
            </Button>
            <Button
              size="small"
              onClick={() => setView('week')}
              color={view === 'week' ? 'primary' : 'secondary'}
              variant={view === 'week' ? 'outlined' : 'text'}
            >
              Hafta
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          {reportProfitExpense && <IncomeAreaChart view={view}/>}
        </Box>
      </MainCard>
    </>
  );
}
