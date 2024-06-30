import { createEntityAdapter } from '@ngrx/entity';
import { CommissionModel, CommissionStatus } from '../../Shared/Models/Commission.model';

export const CommissionAdopter = createEntityAdapter<CommissionModel>({
  selectId: (commission: CommissionModel) => commission.id,
});

export const CustomerState: CommissionStatus = CommissionAdopter.getInitialState({
  errormessage: '',
  isloading: false,
});
