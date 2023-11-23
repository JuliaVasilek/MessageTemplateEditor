import generateMessage from '../src/functions/generateMessageFromTemplateFunc';
import { ITemplateElement } from '../src/interfaces/ITemplateElement';

describe('Проверка функции generateMessage', ()=>{
  const values = [
    {
      testName: 'Three times same variable with no values',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{lastname}{lastname}{lastname}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: ''
    },
    {
      testName: 'Three times same variable with value',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{lastname}{lastname}{lastname}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': 'q',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'qqq'
    },
    {
      testName: 'All four variables with no values',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{firstname}{lastname}{company}{position}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: ''
    },
    {
      testName: 'All four variables with values',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{firstname}{lastname}{company}{position}'}
      ],
      varValues: {
        'firstname': 'q',
        'lastname': 'w',
        'company': 'e',
        'position': 'r'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'qwer'
    },
    {
      testName: 'First variable inside second with no values',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{first{lastname}name}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '{firstname}'
    },
    {
      testName: 'Second variable inside first with no values',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{last{firstname}name}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '{lastname}'
    },
    {
      testName: 'A variable with no value and text',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '123{lastname}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '123'
    },
    {
      testName: 'A variable with a value and text',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '123{lastname}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': 'k',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '123k'
    },
    {
      testName: 'A random word in brackets',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{someWord}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '{someWord}'
    },
    {
      testName: 'A variable as a value of another variable (first option)',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{lastname}'}
      ],
      varValues: {
        'firstname': 'Mary',
        'lastname': '{firstname}',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '{firstname}'
    },
    {
      testName: 'A variable as a value of another variable (second option)',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{firstname}'}
      ],
      varValues: {
        'firstname': '{lastname}',
        'lastname': 'Mary',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '{lastname}'
    },
    {
      testName: 'One of our variables in the text and an extra variable in the object both with no value',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{company}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'age': '',
        'company': '',
        'position': '',
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: ''
    },
    {
      testName: 'One of our variables in the text and an extra variable in the object with value and no value respectively',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{company}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'age': '',
        'company': 'k',
        'position': '',
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'k'
    },
    {
      testName: 'One of our variables in the text and an extra variable in the object with no value and value respectively',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{company}'}
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'age': '10',
        'company': '',
        'position': '',
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: ''
    },
    {
      testName: 'One of variables missing but presented in the text',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{lastname}'}
      ],
      varValues: {
        'firstname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: ''
    },
    {
      testName: 'One of variables missing but presented in the text with random text',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '123{lastname}'}
      ],
      varValues: {
        'firstname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '123'
    },
    {
      testName: 'Several variables on different rows with values',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{firstname} \n{company} \n{lastname}{position}'}
      ],
      varValues: {
        'firstname': 'q',
        'lastname': 'w',
        'company': 'e',
        'position': 'r'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'q \ne \nwr'
    },
    {
      testName: 'Same variable on different rows with value',
      template: [
        {type: 'textarea', id: '1', conditionId: '', text: '{firstname} \n{firstname} \n{firstname}{firstname}'}
      ],
      varValues: {
        'firstname': 'q',
        'lastname': 'w',
        'company': 'e',
        'position': 'r'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'q \nq \nqq'
    },
    {
      testName: 'Condition block: if - position, then - position, else - company, no values',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: ''
    },
    {
      testName: 'Condition block: if - position, then - position, else - company, company - no value, position = s',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': 's'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 's'
    },
    {
      testName: 'Condition block: if - position, then - position, else - company, company = p, position - no value',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': 'p',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'p'
    },
    {
      testName: 'Condition block: if - position, then - position and lastname, else - company and lastname, company = p, position - no value, lastname = t',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}{lastname}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}{lastname}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': 't',
        'company': 'p',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'pt'
    },
    {
      testName: 'Condition block: if - position, then - position and lastname, else - company and lastname, company - no value, position = k, lastname = t',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}{lastname}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}{lastname}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': 't',
        'company': '',
        'position': 'k'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'kt'
    },
    {
      testName: 'Condition block: if - position and randomText, then - position and lastname, else - company and lastname, company - no value, position = k, lastname = t',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '123{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}{lastname}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}{lastname}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': 't',
        'company': '',
        'position': 'k'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'kt'
    },
    {
      testName: 'Condition block: if - position and randomText, then - position and lastname, else - company and lastname, company = p, position - no value, lastname = t',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '123{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}{lastname}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}{lastname}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': 't',
        'company': 'p',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 't'
    },
    {
      testName: 'Condition block: if - company inside "{posi" and "tion}", then - position and lastname, else - firstname and lastname, company - no value, position - no value, lastname = t, firstname = s',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{posi{company}tion}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}{lastname}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{firstname}{lastname}'},
        ],
      ],
      varValues: {
        'firstname': 's',
        'lastname': 't',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 't'
    },
    {
      testName: 'Textarea with position and Condition block: if - position, then - position, else - company, company - no value, position = k',
      template: [
        {type: 'textarea', id: '0', conditionId: '', text: '{company}'},
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': 'k'
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'k'
    },
    {
      testName: 'Textarea with company and Condition block: if - position, then - position, else - company, company = p, position - no value',
      template: [
        {type: 'textarea', id: '0', conditionId: '', text: '{company}'},
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': 'p',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'pp'
    },
    {
      testName: 'Condition block: if - position, then - position, else - company, company = p, position - no value; and Textarea with company',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'then', id: '2', conditionId: 'kjnsdfvjn', text: '{position}'},
          {type: 'else', id: '3', conditionId: 'kjnsdfvjn', text: '{company}'},
        ],
        {type: 'textarea', id: '0', conditionId: '', text: '{company}'},
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': 'p',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: 'pp'
    },
    {
      testName: 'Condition block with condition block inside "then", values in "if"',
      template: [
        [
          {type: 'if', id: '2', conditionId: 'jgvkjnws', text: '1'},
          {type: 'then', id: '3', conditionId: 'jgvkjnws', text: '2'},
          [
            {type: 'if', id: '4', conditionId: 'kjnsdfvjn', text: '3'},
            {type: 'then', id: '5', conditionId: 'kjnsdfvjn', text: '4'},
            {type: 'else', id: '6', conditionId: 'kjnsdfvjn', text: '5'},
          ],
          {type: 'textarea', id: '7', conditionId: '', text: '6'},
          {type: 'else', id: '8', conditionId: 'jgvkjnws', text: '7'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '246'
    },
    {
      testName: 'Condition block with condition block inside "then", no values in "if"',
      template: [
        [
          {type: 'if', id: '2', conditionId: 'jgvkjnws', text: ''},
          {type: 'then', id: '3', conditionId: 'jgvkjnws', text: '2'},
          [
            {type: 'if', id: '4', conditionId: 'kjnsdfvjn', text: ''},
            {type: 'then', id: '5', conditionId: 'kjnsdfvjn', text: '4'},
            {type: 'else', id: '6', conditionId: 'kjnsdfvjn', text: '5'},
          ],
          {type: 'textarea', id: '7', conditionId: '', text: '6'},
          {type: 'else', id: '8', conditionId: 'jgvkjnws', text: '7'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '7'
    },
    {
      testName: 'Condition block with condition block inside "else", values in "if"',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'jgvkjnws', text: '1'},
          {type: 'then', id: '2', conditionId: 'jgvkjnws', text: '2'},
          {type: 'else', id: '3', conditionId: 'jgvkjnws', text: '3'},
          [
            {type: 'if', id: '4', conditionId: 'kjnsdfvjn', text: '4'},
            {type: 'then', id: '5', conditionId: 'kjnsdfvjn', text: '5'},
            {type: 'else', id: '6', conditionId: 'kjnsdfvjn', text: '6'},
          ],
          {type: 'textarea', id: '7', conditionId: '', text: '7'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '2'
    },
    {
      testName: 'Condition block with condition block inside "else", no values in "if"',
      template: [
        [
          {type: 'if', id: '1', conditionId: 'jgvkjnws', text: ''},
          {type: 'then', id: '2', conditionId: 'jgvkjnws', text: '2'},
          {type: 'else', id: '3', conditionId: 'jgvkjnws', text: '3'},
          [
            {type: 'if', id: '4', conditionId: 'kjnsdfvjn', text: ''},
            {type: 'then', id: '5', conditionId: 'kjnsdfvjn', text: '5'},
            {type: 'else', id: '6', conditionId: 'kjnsdfvjn', text: '6'},
          ],
          {type: 'textarea', id: '7', conditionId: '', text: '7'},
        ],
      ],
      varValues: {
        'firstname': '',
        'lastname': '',
        'company': '',
        'position': ''
      },
      arrVarNames: ['firstname', 'lastname', 'company', 'position'],
      expected: '367'
    },

  ];
  values.forEach(test => {
    it(
    `${test.testName}, expected: ${test.expected}`,
      () => {
        const res = generateMessage(test.template as ([] | ITemplateElement)[], test.varValues as {[key:string]: string}, test.arrVarNames);
        expect(res).toBe(test.expected);
      }
      );
  });
});
