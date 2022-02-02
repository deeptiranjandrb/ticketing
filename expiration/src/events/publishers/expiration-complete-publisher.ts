import { Subjects, Publisher, ExpirationCompleteEvent } from '@drbgittix/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}