import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number | string): Date {
    console.log('🚀  DateScalar ~ parseValue ~ value:', value);
    return new Date(value); // value from the client
  }

  serialize(value: Date | string): string {
    console.log('🚀  DateScalar ~ serialize ~ value:', value);
    return value.toString(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
