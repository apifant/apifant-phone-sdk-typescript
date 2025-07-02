import { CallParameterSchema, ICallParameterSchema } from "../../schemas/CallParameterSchema.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IMakeCallMethodParameter  extends ICallParameterSchema {

}



export class MakeCallMethodParameter extends CallParameterSchema {












}

class Builder {

    private  _callId : string;
    private  _targetNumber : string;
    private  _originatingNumber : string;
    private  _gatewayName : string;
    private  _inviteTimeout? : number = 600;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    targetNumber(targetNumber: string) : this{
        this._targetNumber = targetNumber;
        return this;
    }

    originatingNumber(originatingNumber: string) : this{
        this._originatingNumber = originatingNumber;
        return this;
    }

    gatewayName(gatewayName: string) : this{
        this._gatewayName = gatewayName;
        return this;
    }

    inviteTimeout(inviteTimeout: number) : this{
        this._inviteTimeout = inviteTimeout;
        return this;
    }


    build() : MakeCallMethodParameter {
        return new MakeCallMethodParameter({

            callId: this._callId,
            targetNumber: this._targetNumber,
            originatingNumber: this._originatingNumber,
            gatewayName: this._gatewayName,
            inviteTimeout: this._inviteTimeout,
        });
    }
}