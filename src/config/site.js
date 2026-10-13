// Shared metadata and demo user. Customize these values for your institution.
export const siteContext = {
  currentYear: new Date().getFullYear(),
  meta: {
    description: 'Kiaalap - Modern Education Management Dashboard for Universities',
    keywords: 'education, dashboard, university, management, admin',
    author: 'Kiaalap',
  },
  user: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@kiaalap.edu',
    // Set a local image URL to override the initials avatar.
    avatar: null,
    messageCount: 5,
    hasNotifications: true,
    messages: [
      {
        name: 'Sarah Johnson',
        message: 'Can you review my thesis?',
        time: '2 min ago',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff',
      },
      {
        name: 'Mike Chen',
        message: 'Meeting at 3 PM today',
        time: '1 hour ago',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=6366f1&color=fff',
      },
    ],
    notifications: [
      {
        type: 'primary',
        icon: 'bi-calendar-check',
        title: 'New Event',
        message: 'Science Fair on March 15',
        time: '5 minutes ago',
      },
      {
        type: 'success',
        icon: 'bi-check-circle',
        title: 'Assignment Submitted',
        message: 'John submitted his project',
        time: '2 hours ago',
      },
      {
        type: 'warning',
        icon: 'bi-exclamation-triangle',
        title: 'System Alert',
        message: 'Database backup completed',
        time: 'Yesterday',
      },
    ],
  },
};
