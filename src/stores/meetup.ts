import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { IMeetup } from './../modals';

const meetups: Writable<IMeetup.IMeetupData[]> = writable([]);

const meetupsStore = {
    subscribe: meetups.subscribe,
    _setMeetup: (meetupsArray: IMeetup.IMeetupData[]) => {
        meetups.set(meetupsArray);
    },
    _saveMeetup: (meetupData: IMeetup.IMeetupData) => {
        const newMeetup: IMeetup.IMeetupData = { ...meetupData };
        meetups.update((items: IMeetup.IMeetupData[]): IMeetup.IMeetupData[] => {
            return [newMeetup, ...items];
        });
    },
    _updateMeetup: (id: string, meetupData: IMeetup.IMeetupData) => {
        meetups.update((items: IMeetup.IMeetupData[]): IMeetup.IMeetupData[] => {
            const meetupIndex: number = items.findIndex((x) => x.id === id);
            const updatedMeetups: IMeetup.IMeetupData[] = [...items];
            updatedMeetups[meetupIndex] = meetupData;
            return updatedMeetups;
        });
    },
    deleteMeetup: (id: string) => {
        meetups.update((items: IMeetup.IMeetupData[]): IMeetup.IMeetupData[] => {
            return items.filter((x) => x.id !== id);
        });
    },
    toggleFavorite: (meetup: IMeetup.IMeetupData) => {
        meetups.update((items: IMeetup.IMeetupData[]) => {
            const updatedMeetup: IMeetup.IMeetupData = { ...items.find((x) => x.id === meetup.id) };
            updatedMeetup.isFavorite = meetup.isFavorite;
            const meetupIndex: number = items.findIndex((x) => x.id === meetup.id);
            const updatedMeetups: IMeetup.IMeetupData[] = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
};

export default meetupsStore;
