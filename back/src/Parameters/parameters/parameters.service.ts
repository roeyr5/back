import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parameter } from './schemas/parameters.schema';
import { Uav } from './schemas/uavs.schema';
import { ParameterDto } from './schemas/parametersDto';


@Injectable()
export class ParametersService {
  constructor(
    @InjectModel('ParametersFBDown') private fbDownModel: Model<Parameter>,
    @InjectModel('ParametersFBUp') private fbUpModel: Model<Parameter>,
    @InjectModel('ParametersMissionDown') private missionDownModel: Model<Parameter>,
    @InjectModel('ParametersMissionUp') private missionUpModel: Model<Parameter>,
    @InjectModel('Uavs') private UavsModel: Model<Uav>,
    @InjectModel('UavsNumbers') private UavsNumbersModel: Model<Uav>,

  ) {}

  public async getParameters(type: string): Promise<ParameterDto[]> {
    const model =
      type === 'FBDown'
        ? this.fbDownModel
        : type === 'FBUp'
        ? this.fbUpModel
        : type === 'MissionDown'
        ? this.missionDownModel
        : this.missionUpModel;


        const parameters = await model.find().select('Identifier Units InterfaceLimitMin InterfaceLimitMax').exec();    
        return parameters.map((param) => ({
          Identifier: param.Identifier,
          Units: param.Units,
          InterfaceLimitMin: param.InterfaceLimitMin,
          InterfaceLimitMax: param.InterfaceLimitMax,
        }));  
      }


  // public async getUavs(): Promise<{ identifier: string; type: string }[]> {
  //   const uavs = await this.UavsModel.find().select('identifier type').exec();
  //   const identifiers = uavs.map((uav) => ({
  //     identifier: uav.identifier,type: uav.type,
  //   }));

  //   return identifiers;
  // }

  // async getUavsNumbers(): Promise<string[]> {
  //   const uavs = await this.UavsNumbersModel.find().select('identifier').exec();
  //   const uavsIDs = [...uavs.map((id)=> id.identifier)];
  //   return uavsIDs;
  // }
}
