from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import cross_val_score, GridSearchCV

train_data = pd.read_csv('/Users/dell/Desktop/out1.csv')
train_data_y = train_data['label']
train_data_x = train_data.drop(['label'], axis=1)
score_lt = []

# n_estimators最优值为41
# for i in range(0,50,10):
#     rfc = RandomForestClassifier(n_estimators=i+1
#                                 ,random_state=90)
#     score = cross_val_score(rfc, train_data_x, train_data_y, cv=10).mean()
#     score_lt.append(score)
#
# score_max = max(score_lt)
# print('最大得分：{}'.format(score_max),
#       '子树数量为：{}'.format(score_lt.index(score_max)*10+1))
# x = np.arange(1,51,10)
# plt.subplot(111)
# plt.plot(x, score_lt, 'r-')
# plt.show()

# max_depth调参
rfc = RandomForestClassifier(n_estimators=41, random_state=90)
param_grid = {'max_depth':np.arange(1,20)}
GS = GridSearchCV(rfc, param_grid, cv=10)
GS.fit(train_data_x, train_data_y)
best_param = GS.best_params_
best_score = GS.best_score_
print(best_param, best_score)

