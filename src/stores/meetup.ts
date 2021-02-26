import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { IMeetup } from './../modals';

import { ServiceGenerate } from './../helper';

const meetups: Writable<IMeetup.IMeetupItems[]> = writable([
    // {
    //     id: ServiceGenerate.randomId(),
    //     title: 'svelte_title',
    //     subTitle: 'svelte_subTitle',
    //     description:
    //         'svelte_description svelte_description svelte_description svelte_description svelte_description svelte_description svelte_description svelte_description svelte_description svelte_description ',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2015/03/26/09/48/chicago-690364_960_720.jpg',
    //     address: 'svelte_address',
    //     contactEmail: 'svelte@svelte.svelte',
    //     isFavorite: true,
    // },
    // {
    //     id: ServiceGenerate.randomId(),
    //     title: 'svelte_title2',
    //     subTitle: 'svelte_subTitle2',
    //     description: 'svelte_description2',
    //     imageUrl: 'https://cdn.pixabay.com/photo/2016/01/19/17/29/earth-1149733_960_720.jpg',
    //     address: 'svelte_address2',
    //     contactEmail: 'svelte2@svelte.svelte',
    //     isFavorite: false,
    // },
]);

const meetupsStore = {
    subscribe: meetups.subscribe,
    setMeetup: (meetupsArray: IMeetup.IMeetupItems[]) => {
        meetups.set(meetupsArray);
    },
    saveMeetup: (meetupData: IMeetup.IMeetupItems) => {
        const newMeetup: IMeetup.IMeetupItems = { ...meetupData };
        meetups.update((items: IMeetup.IMeetupItems[]): IMeetup.IMeetupItems[] => {
            return [newMeetup, ...items];
        });
    },
    updateMeetup: (id: string, meetupData: IMeetup.IMeetupItems) => {
        meetups.update((items: IMeetup.IMeetupItems[]): IMeetup.IMeetupItems[] => {
            const meetupIndex: number = items.findIndex((x) => x.id === id);
            const updatedMeetups: IMeetup.IMeetupItems[] = [...items];
            updatedMeetups[meetupIndex] = meetupData;
            return updatedMeetups;
        });
    },
    deleteMeetup: (id: string) => {
        meetups.update((items: IMeetup.IMeetupItems[]): IMeetup.IMeetupItems[] => {
            return items.filter((x) => x.id !== id);
        });
    },
    toggleFavorite: (meetup: IMeetup.IMeetupItems) => {
        meetups.update((items: IMeetup.IMeetupItems[]) => {
            const updatedMeetup: IMeetup.IMeetupItems = { ...items.find((x) => x.id === meetup.id) };
            updatedMeetup.isFavorite = meetup.isFavorite;
            const meetupIndex: number = items.findIndex((x) => x.id === meetup.id);
            const updatedMeetups: IMeetup.IMeetupItems[] = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
};

export default meetupsStore;
