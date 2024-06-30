import { createAction, props } from "@ngrx/store"
import { CommissionModel } from "../../Shared/Models/Commission.model"



export const LOAD_COMMISSION='[CUSTOMER page]load COMMISSION'
export const LOAD_COMMISSION_SUCCESS='[COMMISSION page]load COMMISSION success'
export const LOAD_COMMISSION_FAIL='[COMMISSION page]load CUSTOMER fail'

export const DELETE_COMMISSION='[DELETE page]load COMMISSION'
export const DELETE_COMMISSION_SUCCESS='[COMMISSION page]delete CUSTOMER success'



export const loadCOMMISSIONS=createAction(LOAD_COMMISSION)
export const loadCOMMISSIONSsuccess=createAction(LOAD_COMMISSION_SUCCESS,props<{list:CommissionModel[]}>())
export const loadCOMMISSIONSfail=createAction(LOAD_COMMISSION_FAIL,props<{errormessage:string}>())


export const deleteCOMMISSIONS=createAction(DELETE_COMMISSION,props<{id:number}>())
export const deleteCUSTOMERsuccess=createAction(DELETE_COMMISSION_SUCCESS,props<{id:number}>())
