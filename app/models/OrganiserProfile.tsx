interface OrganiseProfile extends Model {
    bio: string;
    contactEmail: null | string
    contactPhone: null | string
    organiserName: null | string
    webisteUrl: null | string
    user: string
    status: 'active' | 'suspended' | 'pending' | 'draft'
}