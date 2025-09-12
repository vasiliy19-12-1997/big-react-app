import {
    Listbox as HListBox,
} from '@headlessui/react';
import { useState } from 'react';
import cls from './ListBox.module.scss';

interface ListboxProps{
  className?: string;

}
const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
];

export function Listbox(props:ListboxProps) {
    const { className } = props;
    const [selectedPerson, setSelectedPerson] = useState(people[0]);

    return (
        <HListBox as="div" value={selectedPerson} onChange={setSelectedPerson}>
            <HListBox.Button className={cls.button}>{selectedPerson.name}</HListBox.Button>
            <HListBox.Options className={cls.options}>
                {people.map((person) => (
                    <HListBox.Option key={person.id} value={person} className={cls.items}>
                        {({ selected, active }) => (
                            <li>
                                {person.name}
                            </li>
                        )}

                    </HListBox.Option>
                ))}
            </HListBox.Options>
        </HListBox>
    );
}
