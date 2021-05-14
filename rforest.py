import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# 得出模型
train_data = pd.read_csv('/Users/dell/Desktop/out2.csv')
train_data_y = train_data['label']
train_data_x = train_data.drop(['label'], axis=1)
model_rf_default =RandomForestClassifier(n_estimators=41,
                             max_features='auto',
                             max_depth=None,
                             min_samples_split=2,
                             min_samples_leaf=1)
model_rf_default.fit(train_data_x, train_data_y)
joblib.dump(model_rf_default, '/Users/dell/Desktop/rf.model')
