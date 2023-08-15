import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class StudentNumberLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number, args: ValidationArguments) {
    const stringValue = String(value);
    return stringValue.length === 10; // 10자리로 고정
  }

  defaultMessage(args: ValidationArguments) {
    return '학번은 10자리여야 합니다.';
  }
}

export function IsValidStudentNumberLength(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: StudentNumberLengthConstraint,
    });
  };
}
