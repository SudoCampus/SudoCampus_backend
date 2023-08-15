import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class GpaRangeConstraint implements ValidatorConstraintInterface {
  validate(value: number) {
    return value >= 0 && value <= 4.5;
  }

  defaultMessage() {
    return '학점은 0점 이상 4.5점 이하여야 합니다.';
  }
}

export function IsInGpaRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: GpaRangeConstraint,
    });
  };
}
