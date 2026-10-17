import { AbortError, type AbortErrorOptions } from '@alessiofrittoli/exception/abort'
import type { ErrorCode } from '@alessiofrittoli/exception/code'

/**
 * A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object.
 *
 */
export interface AbortSignal<TCode = ErrorCode> extends globalThis.AbortSignal {
	readonly reason: AbortError<TCode>
	onabort: ((this: AbortSignal, event: Event) => unknown) | null
	addEventListener<K extends keyof AbortSignalEventMap>(
		type: K,
		// oxlint-disable-next-line typescript/no-explicit-any
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void
	removeEventListener<K extends keyof AbortSignalEventMap>(
		type: K,
		// oxlint-disable-next-line typescript/no-explicit-any
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void
}

/**
 * A controller object that allows you to abort one or more DOM requests as and when desired.
 *
 * @template TCode A custom type assigned to the `AbortError.code`. Default: {@link ErrorCode}.
 *
 * @extends globalThis.AbortController
 */
export class AbortController<TCode = ErrorCode> extends globalThis.AbortController {
	public override readonly signal: AbortSignal<TCode>

	public constructor() {
		super()
		this.signal = super.signal
	}

	/**
	 * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
	 *
	 * @param reason	( Optional ) The abort reason. This will be set to `AbortError.message`.
	 * @param options	( Optioanl ) Custom `AbortError` options.
	 */
	public override abort(
		reason: string = 'The operation was aborted.',
		options?: Omit<AbortErrorOptions<TCode>, 'message'>,
	): void {
		return super.abort(new AbortError<TCode>({ ...options, message: reason }))
	}
}
