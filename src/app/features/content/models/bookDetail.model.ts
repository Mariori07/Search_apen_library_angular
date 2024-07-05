import { TypeModel } from "./type.model";
import { AuthorModel } from "./author.model";
import { DescriptionModel } from "./description.model";
import { CreatedOrLastModifiedModel } from "./createdOrLastModified.model";

export interface BookDetailModel {
    title: string;
    covers: number[];
    subject_places: string[];
    subjects: string[];
    subject_people: string[];
    key: string;
    authors: AuthorModel[];
    subject_times: string[];
    type: TypeModel;
    description: DescriptionModel;
    latest_revision: number;
    revision: number;
    created: CreatedOrLastModifiedModel;
    last_modified: CreatedOrLastModifiedModel;
  }