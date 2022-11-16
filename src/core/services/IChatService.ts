import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  GetConversationMessagesQueryParams,
  GetConversationMessagesResponse,
  GetConversationsQueryParams,
  GetConversationsResponse,
  GlobalAxiosRequestConfig,
  SendInvitationRequest,
  SendInvitationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from "@src/models";

export interface IChatService {
  getConversations(
    params: GetConversationsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetConversationsResponse, GlobalAxiosRequestConfig>
  >;

  getConversationMessages(
    params: GetConversationMessagesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetConversationMessagesResponse, GlobalAxiosRequestConfig>
  >;

  sendInvitation(
    data: SendInvitationRequest,
  ): Promise<AxiosResponse<SendInvitationResponse, GlobalAxiosRequestConfig>>;

  acceptInvitation(
    data: AcceptInvitationRequest,
  ): Promise<AxiosResponse<AcceptInvitationResponse, GlobalAxiosRequestConfig>>;

  sendMessage(
    data: SendMessageRequest,
  ): Promise<AxiosResponse<SendMessageResponse, GlobalAxiosRequestConfig>>;
}
