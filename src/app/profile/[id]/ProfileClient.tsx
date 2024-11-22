'use client';

import React from 'react';

export default function ProfileClient({ id }: { id: string }) {
    return (
        <div className="h-screen grid place-items-center">
            <div>User ID: {id}</div>
        </div>
    );
}
