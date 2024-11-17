import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState: {
        isLoading: false,
        maintenancesTech: [],
    },
    reducers: {
        fetchMaintenancesByTech(state) {
            state.isLoading = true;
        },
        fetchMaintenancesByTechSuccess(state, action) {
            state.isLoading = false;
            state.maintenancesTech = action.payload;
        },
        fetchMaintenancesByTechFailure(state, action) {
            state.isLoading = false;
            toast.error(action.payload);
        }
    },
});

export const maintenanceActions = maintenanceSlice.actions;
export default maintenanceSlice.reducer;