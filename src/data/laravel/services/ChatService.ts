import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import CancelablePromise from "cancelable-promise";
import {IChatService} from "@core/services/IChatService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetConversationsResponse,
  GlobalAxiosRequestConfig,
  GetConversationMessagesQueryParams,
  GetConversationMessagesResponse,
  SendInvitationRequest,
  SendInvitationResponse,
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  SendMessageRequest,
  SendMessageResponse,
  GetConversationsQueryParams,
} from "@src/models";

@injectable()
export class ChatService implements IChatService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}
  getConversations(
    params: GetConversationsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetConversationsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetConversationsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetConversationsResponse>(`messages`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
  getConversationMessages({
    messageId,
    ...params
  }: GetConversationMessagesQueryParams): CancelablePromise<
    AxiosResponse<GetConversationMessagesResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetConversationMessagesResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetConversationMessagesResponse>(`user-messages/${messageId}`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  sendInvitation(
    data: SendInvitationRequest,
  ): Promise<AxiosResponse<SendInvitationResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<SendInvitationResponse>("send-invitation", {
      receiver_id: data.receiverId,
    });
  }

  acceptInvitation(
    data: AcceptInvitationRequest,
  ): Promise<
    AxiosResponse<AcceptInvitationResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.post<SendInvitationResponse>("accept-invitation", {
      receiver_id: data.receiverId,
    });
  }

  sendMessage(
    data: SendMessageRequest,
  ): Promise<AxiosResponse<SendMessageResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<SendInvitationResponse>("accept-invitation", {
      receiver_id: data.receiverId,
      message: data.message,
    });
  }
}
