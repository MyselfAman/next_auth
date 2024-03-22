'use client'

import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const params = useParams();
    return (
        <div>profile {params.id}</div>
    )
}
