import {
  NamedServiceClientFactory,
  StitchServiceClient
} from "mongodb-stitch-browser-core";
import {
  CoreStitchServiceClient,
  StitchAppClientInfo
} from "mongodb-stitch-core-sdk";
import { CoreTwilioServiceClient } from "mongodb-stitch-core-services-twilio";
import TwilioServiceClientImpl from "./internal/TwilioServiceClientImpl";

/**
 * The Twilio service client.
 */
export interface TwilioServiceClient {
  /**
   * Sends an SMS/MMS message.
   *
   * @param to the number to send the message to.
   * @param from the number that the message is from.
   * @param body the body text of the message.
   * @param mediaUrl the URL of the media to send in an MMS.
   * @return a task that completes when the send is done.
   */
  sendMessage(
    to: string,
    from: string,
    body: string,
    mediaUrl?: string
  ): Promise<void>;
}

export namespace TwilioServiceClient {
  export const factory: NamedServiceClientFactory<
    TwilioServiceClient
  > = new class implements NamedServiceClientFactory<TwilioServiceClient> {
    public getNamedClient(
      service: StitchServiceClient,
      client: StitchAppClientInfo
    ): TwilioServiceClient {
      return new TwilioServiceClientImpl(new CoreTwilioServiceClient(service));
    }
  }();
}
