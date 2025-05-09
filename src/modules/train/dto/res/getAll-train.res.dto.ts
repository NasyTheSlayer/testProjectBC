import { OmitType } from "@nestjs/mapped-types";
import { TrainResponseDto } from "./train.res.dto";

export class GetAllTrainsResponseDto extends OmitType(TrainResponseDto, []) {
    meta: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}