import Spinner from '@/components/spinner'
import React from 'react'

function loading() {
    return (
        <main className='min-h-screen flex justify-center items-center'>
            <Spinner />
        </main>
    )
}

export default loading
