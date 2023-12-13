export default class Paths {
  static Translation = class {
    static translations = 'intl';
  };

  static Auth = class {
    static login = 'auth/login';
    static register = 'auth/register';
    static forgotPassword = 'auth/forgotten-password';
    static resetPassword = 'auth/reset-password';
  };

  static ParticipantAssessment = class {
    static assessment = 'participant/assessment';
    static assessmentQuestions = 'participant/assessment-type';
  };

  static UserAssessment = class {
    static assessment = 'user/assessments';
    static assessmentsFiltered = 'user/assessments/filtered';
    static assessmentsHelp = 'user/assessments/help';
    static assessmentsRecent = 'user/assessments/recent';
    static assessmentIdRecentResults = (assessmentId) =>
      `user/assessments/${assessmentId}/recent/results`;
    static assessmentIdsRecentResults = 'user/results/recent';
  };

  static User = class {
    static self = 'user/users/self';
    static selfPassword = 'user/users/self/password';
  };

  static Cdk = class {
    static cdk = (cdkType, jsonId) => `cdk/${cdkType}/${jsonId}`;
    static cdkList = (cdkType) => `cdk/${cdkType}`;
    static areas = (cdkType) => `cdk/${cdkType}/values/area`;
    static competences = (cdkType) => `cdk/${cdkType}/values/competence`;
    static difficulties = (cdkType) => `cdk/${cdkType}/values/difficulty`;
    static rating = (cdkType, jsonId) => `cdk/${cdkType}/${jsonId}/rating`;
    static ratings = (cdkType, jsonId) => `cdk/${cdkType}/${jsonId}/ratings`;
  };
}
