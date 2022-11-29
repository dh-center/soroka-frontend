const English = {
    soroka: 'Soroka',
    language: 'Language',

    // Общее
    save: 'Save',
    buttonAddProperty: 'Add property',
    addPropertyTitle: 'Click on the desired property to add it',
    placeholderNewCard: 'New card',
    placeholderEditLink: 'Enter link...',
    tooltipAllPropertiesAlreadyAdded: 'All possible properties already added',
    saved: 'Saved',
    property: 'Property',
    enity: 'Enity',
    organization: 'Organization',
    owner: 'Owner',
    loading: 'Loading',
    topToolbar: 'Top Toolbar',

    // Header
    exit: 'Exit',

    // Страница логина
    loginTitle: 'Login',
    login: 'Login',
    incorrectLogin: 'Incorrect login or password. {br} Please, try again, or ask for help: {email}',

    // Список карточек
    notFilled: 'Not filled',
    cards: 'Cards',
    allOrganizations: 'All organizations',
    emptyCardList: 'No cards',

    // Страница создания карточки
    newCardWarningModalText: 'Add any desired properties, fill out the card and save',
    newCard: 'New card',
    nameOfCard: 'Name',
    preventDelete: 'Prevent delete',

    // Страница редактирования карточки
    changeCardWarningModalText: 'This card is not completely filled out: it has empty fields.',

    // Модкала с диалогом
    unsavedChanges: 'Unsaved changes',
    saveBeforeExit: 'Save before leaving?',
    deleteCardConfirm: 'Delete the card, all its properties and files?',
    deleteAlert: 'Delete propertie and value?',
    sureCancel: 'Do you sure that you want cancel changing card?',
    yes: 'Yes',
    no: 'No',

    ok: 'Ok',
    cancel: 'Cancel',

    // Регистрация
    emailOrPhone: 'Email or phone',
    password: 'Password',
    repeatPassword: 'Repeat password',
    signUp: 'Sign up',
    asAuthor: 'as author',
    author: 'Author',
    asAdministrator: 'as administrator',
    administrator: 'Administrator',
    asEditor: 'as editor',
    editor: 'Editor',
    inviteBrief:
        "<p>Hello <b>{name}</b> ({organizationName})! You have been invited to participate in the collective data collection within the framework of the Assembly of Petrovsky Museums in <b>{userRole}</b>.</p><p>We will collect data here, in the new Soroka application created by ITMO. Data will be displayed on the Wunderkammer project website.</p><p>We can't wait to see the unique objects and stories that only you know about, but first of all, legal formalities are required.</p><p>Please carefully read the <agreement>user agreement</agreement>. It describes in detail how the resulting materials will be used. We also have a “<simpleAgreement>translation</simpleAgreement>” agreement - a simplified explanation of each clause.</p><p>By clicking the continue button, you agree to the <agreement>user agreement</agreement> and confirm that you are a representative museum, which is entitled to such obligations</p>",
    continue: 'Continue',
    passwordsDoNotMatch: 'Passwords do not match',
    registrationByInvitation: 'Registration by invitation',

    // Свойства
    unknownProperty: 'Unknown property',
    address: 'Address',
    legalName: 'Legal name',
    artisticText: 'Artistic text',
    tags: 'Tags',
    sources: 'Sources',
    quote: 'Quote',
    julianDate: 'Date',
    geoPoint: 'Geo point',
    annotation: 'Annotation',
    media: 'Media',
    bibliography: 'Bibliography',
    copyrightHolder: 'Copyright holder',
    creationPlace: 'Creation place',
    creator: 'Creator',
    family: 'Family',
    format: 'Format',
    originalText: 'Original text',
    participants: 'Participants',
    profession: 'Profession',
    refutation: 'Refutation',
    socialNetworks: 'Social networks',
    storage: 'Storage',
    url: 'URL',
    size: 'Size',

    help: 'Help',
    hideHelp: 'Hide help',
    delete: 'Delete',
    rename: 'Rename',
    copyLink: 'Copy link',

    // Измерения
    cylinderTooltip: 'Cylinder',
    cubeTooltip: 'Cube',
    sphereTooltip: 'Sphere',
    planeTooltip: 'Plane',
    lineTooltip: 'Line',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    diameter: 'Diameter',
    note: 'Note',
    mm: 'mm',
    cm: 'cm',
    m: 'm',
    w: 'W',
    h: 'H',
    l: 'L',
    d: 'D',

    noSuchDate: 'No such date in that calender',
    datesMustBeConsecutive: 'Dates must be consecutive',
    calendarGregorian: 'Gregorian calendar',
    calendarGregorianDate: 'Gregorian date',
    calendarJulian: 'Julian calendar',
    calendarJulianDate: 'Julian date',
    anyString: 'Any string',
    calendarStringDate: 'Greagorian date',
    gregorianDateForStringInfo:
        'In order for the system to sort and filter the cards, it is necessary to enter at least an approximate Gregorian date',
    calendarHelp:
        '<p>All dates are stored in julian date format and can be compared with each other. When you change the calendar, the entered dates do not change</p><p> Currently, the Julian and Gregorian calendars are supported.</p><p>For example, you can enter the exact dates “04/12/1698”</p>',
    placeName: 'Place name',
    invalidCoordinates: 'Invalid coordinates',
    coordinatesHelp:
        'Select a point on the map or enter coordinates in degrees (as a decimal fraction separated by commas), for example, for coordinates 55°24\'32.1"N 32°15\'32.3"E you would enter <b>55.408902,32.258976</b>',

    coverCardFile: 'Cover',
    mainCardFile: 'Main',
    uploadFiles: 'Upload files',
    dragFiles: 'Drag files here',
    orDragFiles: 'or drag files here',
    mediaHelp:
        '<p>Acceptable file formats: jpg, png, mp3</p><div>After uploading the files, you will be able to choose:<ul><li>{eye}<span>Cover for the card (among the images)</span></li><li>{star}<span>Main file (for example, this can be an edited interview among excerpts, or the highest quality image)</span></li></ul></div>',

    templates: 'Templates',
    withoutTemplate: 'Without template',
    choosePropertiesByYourself: 'You can choose all needed properties by yourself',

    peterTravelPoint: "Great Peter's embassy point",
    museum: 'Museum',
    book: 'Book',

    isEntityLabel: 'Suggest this card as an entity',
    showInAllOrganizationsLabel: 'Show in all organizations',
    entityHelp:
        '<p>Please note: deleting a card or unchecking an entity will only be possible if </p><ul><li>No one uses this card as their entity</li><li>Or the card has a parent entity (then after deletion we will replace it in all cards on the parent)</li></ul>',
    selectEntity: 'Select entity',
    selectParentEntityValidationMessage: '<p>Only cards with the property "entity" may not have a parent entity</p>',
    selectParentEntityTooltip:
        '<p>An entity is what a card is in the real world.</p><p>If the options in the list are too abstract, you can create any card, add the “Entity Card” property to it, and it will appear in this list .</p><p>If you want other organizations to use such an entity, you can add the “global card” property</p><p>Only entity cards can not have a parent entity.</p>',
    selectEntityCaption: '<p>Entity</p><span>*</span>'
}

export default English
