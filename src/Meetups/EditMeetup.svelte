<script>
    import { createEventDispatcher } from 'svelte';
    import meetups from './../stores/meetup';

    import type { IMeetup } from './../modals';
    import { EInputType } from './../enums/meetup';
    import { ServiceValidation, } from './../helper';

    import TextInput from './../UI/TextInput.svelte';
    import Button from './../UI/Button.svelte';
    import Modals from './../UI/Modals.svelte';

    const dispatch: (name: string, detail?: any) => void = createEventDispatcher();

<<<<<<< HEAD
    let meetup: IMeetup.IMeetupItems = {
=======
    let meetup: IMeetup.IMeetupData = {
>>>>>>> fe6748045566ea9bcdfd001cb0f3e464ef870491
        // id: ServiceGenerate.randomId(),
        title: '',
        subTitle: '',
        description: '',
        imageUrl: '',
        address: '',
        contactEmail: '',
        isFavorite: false,
    };

    export let id: string = null;

    if (id) {
        const unsubscribe = meetups.subscribe((items) => {
<<<<<<< HEAD
            const selectedMeetup: IMeetup.IMeetupItems = items.find((x) => x.id === id);
=======
            const selectedMeetup: IMeetup.IMeetupData = items.find((x) => x.id === id);
>>>>>>> fe6748045566ea9bcdfd001cb0f3e464ef870491
            meetup = JSON.parse(JSON.stringify(selectedMeetup));
        });

        unsubscribe();
    }

    const titleInput: IMeetup.ITextInput = {
        id: 'title',
        label: 'Title',
        value: meetup.title,
        valid: false,
        validMessage: 'Please enter a valid title',
    };

    const subTitleInput: IMeetup.ITextInput = {
        id: 'subTitle',
        label: 'Sub Title',
        value: meetup.subTitle,
        valid: false,
        validMessage: 'Please enter a valid sub title',
    };

    const addressInput: IMeetup.ITextInput = {
        id: 'address',
        label: 'Address',
        value: meetup.address,
        valid: false,
        validMessage: 'Please enter a valid address',
    };

    const imageUrlInput: IMeetup.ITextInput = {
        id: 'imageUrl',
        label: 'Image Url',
        value: meetup.imageUrl,
        valid: false,
        validMessage: 'Please enter a valid image url',
    };

    const contactEmailInput: IMeetup.ITextInput = {
        id: 'contactEmail',
        label: 'Contact Email',
        type: EInputType.email,
        value: meetup.contactEmail,
        valid: false,
        validMessage: 'Please enter a valid contact email',
    };

    const descriptionInput: IMeetup.ITextInput = {
        id: 'description',
        label: 'Description',
        type: EInputType.textarea,
        rows: 3,
        value: meetup.description,
        valid: false,
        validMessage: 'Please enter a valid description',
    };

    let buttonCancel: IMeetup.IButton = {
        mode: 'outline',
    };

    let modalTitle: string = id ? 'Edit Meetup' : 'Create New Meetup';

    let isFormValid: boolean = false;

    // watch value, if value change update UI
    $: titleInput.valid = !ServiceValidation.isEmpty(meetup.title);
    $: subTitleInput.valid = !ServiceValidation.isEmpty(meetup.subTitle);
    $: addressInput.valid = !ServiceValidation.isEmpty(meetup.address);
    $: imageUrlInput.valid = ServiceValidation.isImage(meetup.imageUrl);
    $: contactEmailInput.valid = ServiceValidation.isEmail(meetup.contactEmail);
    $: descriptionInput.valid = !ServiceValidation.isEmpty(meetup.description);
    $: isFormValid =
        titleInput.valid && subTitleInput.valid && addressInput.valid && imageUrlInput.valid && contactEmailInput.valid && descriptionInput.valid;

    function handleTitle(e): void {
        meetup.title = e.target.value;
    }

    function handleSubTitle(e: any): void {
        meetup.subTitle = e.target.value;
    }

    function handleAddress(e: any): void {
        meetup.address = e.target.value;
    }

    function handleImageUrl(e: any): void {
        meetup.imageUrl = e.target.value;
    }

    function handleContactEmail(e: any): void {
        meetup.contactEmail = e.target.value;
    }

    function handleDescription(e: any): void {
        meetup.description = e.target.value;
    }

    async function saveMeetup(): Promise<void> {
<<<<<<< HEAD
        // const meetupData: IMeetup.IMeetupItems = JSON.parse(JSON.stringify(meetup));
        const meetupData: IMeetup.IMeetupItems = meetup;
=======
        // const meetupData: IMeetup.IMeetupData = JSON.parse(JSON.stringify(meetup));
        const meetupData: IMeetup.IMeetupData = meetup;
>>>>>>> fe6748045566ea9bcdfd001cb0f3e464ef870491

        // edit mode
        if (id) {
            if (meetupData.id) delete meetupData.id;
            const res: any = await fetch(`https://svelte-meeup-default-rtdb.firebaseio.com/meetups/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(meetupData),
                headers: { 'Content-Type': 'application/json' },
            }).catch((err) => console.error(err));

            if (!res.ok) throw new Error('An error occured, please try again');

            meetups.updateMeetup(id, meetupData);
        } else {
            const res: any = await fetch('https://svelte-meeup-default-rtdb.firebaseio.com/meetups.json', {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: { 'Content-Type': 'application/json' },
            }).catch((err) => console.error(err));

            if (!res.ok) throw new Error('An error occured, please try again');

            let data: { name: string } = await res.json();
            meetupData.id = data.name;
            meetups.saveMeetup(meetupData);

            console.log('meetupData => ', meetupData);
        }

        dispatch('save-data', meetup);
    }

    function closeModal(): void {
        dispatch('close-modal');
    }

    function deleteMeetup(): void {
        meetups.deleteMeetup(id);
        dispatch('save-data', meetup);
    }
</script>

<Modals {modalTitle} on:close-modal>
    <form on:submit|preventDefault={saveMeetup}>
        <TextInput textInput={titleInput} on:input={handleTitle} />
        <TextInput textInput={subTitleInput} on:input={handleSubTitle} />
        <TextInput textInput={addressInput} on:input={handleAddress} />
        <TextInput textInput={imageUrlInput} on:input={handleImageUrl} />
        <TextInput textInput={contactEmailInput} on:input={handleContactEmail} />
        <TextInput textInput={descriptionInput} on:input={handleDescription} />
    </form>

    <div class="button" slot="footer">
        <Button on:click={saveMeetup} disabled={!isFormValid}>Save</Button>

        {#if id}
            <Button on:click={deleteMeetup}>Delete</Button>
        {/if}

        <Button button={buttonCancel} on:click={closeModal}>Cancel</Button>
    </div>
</Modals>

<style>
    form {
        width: 100%;
    }
</style>
