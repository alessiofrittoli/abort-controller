import { AbortError, AbortErrorOptions } from '@alessiofrittoli/exception/abort'
import { ErrorCode } from '@alessiofrittoli/exception/code'
import { AbortController } from '@/index'


describe( 'AbortController', () => {
	

	it( 'creates an instance of AbortController', () => {

		const controller = new AbortController()
		expect( controller ).toBeInstanceOf( globalThis.AbortController )
		expect( controller.signal ).toBeInstanceOf( AbortSignal )

	} )


	it( 'aborts with the default reason', () => {

		const controller	= new AbortController()
		const { signal }	= controller

		expect( signal.aborted ).toBe( false )

		controller.abort()

		expect( signal.aborted ).toBe( true )
		expect( signal.reason ).toBeInstanceOf( AbortError )
		expect( signal.reason.message ).toBe( 'The operation was aborted.' )
		expect( signal.reason.code ).toBe( ErrorCode.ABORT )

	} )


	it( 'aborts with a custom reason', () => {

		const controller	= new AbortController()
		const { signal }	= controller
		const customReason	= 'Custom abort reason'

		expect( signal.aborted ).toBe( false )

		controller.abort( customReason )

		expect( signal.aborted ).toBe( true )
		expect( signal.reason ).toBeInstanceOf( AbortError )
		expect( signal.reason.message ).toBe( customReason )
		expect( signal.reason.code ).toBe( ErrorCode.ABORT )

	} )


	it( 'aborts with custom AbortError options', () => {

		enum CustomAbortCode
		{
			CUSTOM_ABORT = 'ERR:CUSTOMABORTREASON'
		}


		const controller	= new AbortController<CustomAbortCode>()
		const { signal }	= controller
		const customReason	= 'Custom abort reason'
		const customCause	= 'Additional abort cause'
		const customOptions: AbortErrorOptions<CustomAbortCode> = {
			cause	: customCause,
			code	: CustomAbortCode.CUSTOM_ABORT,
			status	: 400,
		}

		expect( signal.aborted ).toBe( false )

		controller.abort( customReason, customOptions )

		expect( signal.aborted ).toBe( true )
		expect( signal.reason ).toBeInstanceOf( AbortError )
		expect( signal.reason.message ).toBe( customReason )
		expect( signal.reason.cause ).toBe( customCause )
		expect( signal.reason.code ).toBe( CustomAbortCode.CUSTOM_ABORT )
		expect( signal.reason.status ).toBe( 400 )

	} )

} )