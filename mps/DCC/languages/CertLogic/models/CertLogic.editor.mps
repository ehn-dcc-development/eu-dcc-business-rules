<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:5997b151-d54b-41a2-9b29-4d870fe3093d(CertLogic.editor)">
  <persistence version="9" />
  <languages>
    <use id="18bc6592-03a6-4e29-a83a-7ff23bde13ba" name="jetbrains.mps.lang.editor" version="14" />
    <use id="aee9cad2-acd4-4608-aef2-0004f6a1cdbd" name="jetbrains.mps.lang.actions" version="4" />
    <devkit ref="fbc25dd2-5da4-483a-8b19-70928e1b62d7(jetbrains.mps.devkit.general-purpose)" />
  </languages>
  <imports>
    <import index="u3iy" ref="r:c849d378-e965-4689-a87a-8119028c50b2(CertLogic.structure)" implicit="true" />
    <import index="wyt6" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.lang(JDK/)" implicit="true" />
  </imports>
  <registry>
    <language id="18bc6592-03a6-4e29-a83a-7ff23bde13ba" name="jetbrains.mps.lang.editor">
      <concept id="1071666914219" name="jetbrains.mps.lang.editor.structure.ConceptEditorDeclaration" flags="ig" index="24kQdi" />
      <concept id="1140524381322" name="jetbrains.mps.lang.editor.structure.CellModel_ListWithRole" flags="ng" index="2czfm3">
        <property id="1140524450557" name="separatorText" index="2czwfO" />
        <child id="1140524464360" name="cellLayout" index="2czzBx" />
      </concept>
      <concept id="1106270549637" name="jetbrains.mps.lang.editor.structure.CellLayout_Horizontal" flags="nn" index="2iRfu4" />
      <concept id="1106270571710" name="jetbrains.mps.lang.editor.structure.CellLayout_Vertical" flags="nn" index="2iRkQZ" />
      <concept id="1142886221719" name="jetbrains.mps.lang.editor.structure.QueryFunction_NodeCondition" flags="in" index="pkWqt" />
      <concept id="1142886811589" name="jetbrains.mps.lang.editor.structure.ConceptFunctionParameter_node" flags="nn" index="pncrf" />
      <concept id="1080736578640" name="jetbrains.mps.lang.editor.structure.BaseEditorComponent" flags="ig" index="2wURMF">
        <child id="1080736633877" name="cellModel" index="2wV5jI" />
      </concept>
      <concept id="1186402211651" name="jetbrains.mps.lang.editor.structure.StyleSheet" flags="ng" index="V5hpn">
        <child id="1186402402630" name="styles" index="V601i" />
      </concept>
      <concept id="1186403694788" name="jetbrains.mps.lang.editor.structure.ColorStyleClassItem" flags="ln" index="VaVBg">
        <property id="1186403713874" name="color" index="Vb096" />
      </concept>
      <concept id="1186403751766" name="jetbrains.mps.lang.editor.structure.FontStyleStyleClassItem" flags="ln" index="Vb9p2">
        <property id="1186403771423" name="style" index="Vbekb" />
      </concept>
      <concept id="1186404549998" name="jetbrains.mps.lang.editor.structure.ForegroundColorStyleClassItem" flags="ln" index="VechU" />
      <concept id="1186414536763" name="jetbrains.mps.lang.editor.structure.BooleanStyleSheetItem" flags="ln" index="VOi$J">
        <property id="1186414551515" name="flag" index="VOm3f" />
      </concept>
      <concept id="1186414928363" name="jetbrains.mps.lang.editor.structure.SelectableStyleSheetItem" flags="ln" index="VPM3Z" />
      <concept id="1233758997495" name="jetbrains.mps.lang.editor.structure.PunctuationLeftStyleClassItem" flags="ln" index="11L4FC" />
      <concept id="1233759184865" name="jetbrains.mps.lang.editor.structure.PunctuationRightStyleClassItem" flags="ln" index="11LMrY" />
      <concept id="3383245079137382180" name="jetbrains.mps.lang.editor.structure.StyleClass" flags="ig" index="14StLt" />
      <concept id="1381004262292414836" name="jetbrains.mps.lang.editor.structure.ICellStyle" flags="ng" index="1k5N5V">
        <reference id="1381004262292426837" name="parentStyleClass" index="1k5W1q" />
      </concept>
      <concept id="1223387125302" name="jetbrains.mps.lang.editor.structure.QueryFunction_Boolean" flags="in" index="3nzxsE" />
      <concept id="9122903797336200704" name="jetbrains.mps.lang.editor.structure.ApplyStyleClassCondition" flags="lg" index="1uO$qF">
        <child id="9122903797336200706" name="query" index="1uO$qD" />
      </concept>
      <concept id="9122903797312246523" name="jetbrains.mps.lang.editor.structure.StyleReference" flags="ng" index="1wgc9g">
        <reference id="9122903797312247166" name="style" index="1wgcnl" />
      </concept>
      <concept id="1139848536355" name="jetbrains.mps.lang.editor.structure.CellModel_WithRole" flags="ng" index="1$h60E">
        <reference id="1140103550593" name="relationDeclaration" index="1NtTu8" />
      </concept>
      <concept id="1073389214265" name="jetbrains.mps.lang.editor.structure.EditorCellModel" flags="ng" index="3EYTF0">
        <child id="1142887637401" name="renderingCondition" index="pqm2j" />
      </concept>
      <concept id="1073389446423" name="jetbrains.mps.lang.editor.structure.CellModel_Collection" flags="sn" stub="3013115976261988961" index="3EZMnI">
        <child id="1106270802874" name="cellLayout" index="2iSdaV" />
        <child id="1073389446424" name="childCellModel" index="3EZMnx" />
      </concept>
      <concept id="1073389577006" name="jetbrains.mps.lang.editor.structure.CellModel_Constant" flags="sn" stub="3610246225209162225" index="3F0ifn">
        <property id="1073389577007" name="text" index="3F0ifm" />
      </concept>
      <concept id="1073389658414" name="jetbrains.mps.lang.editor.structure.CellModel_Property" flags="sg" stub="730538219796134133" index="3F0A7n" />
      <concept id="1219418625346" name="jetbrains.mps.lang.editor.structure.IStyleContainer" flags="ng" index="3F0Thp">
        <child id="1219418656006" name="styleItem" index="3F10Kt" />
      </concept>
      <concept id="1073389882823" name="jetbrains.mps.lang.editor.structure.CellModel_RefNode" flags="sg" stub="730538219795960754" index="3F1sOY" />
      <concept id="1073390211982" name="jetbrains.mps.lang.editor.structure.CellModel_RefNodeList" flags="sg" stub="2794558372793454595" index="3F2HdR" />
      <concept id="1950447826681509042" name="jetbrains.mps.lang.editor.structure.ApplyStyleClass" flags="lg" index="3Xmtl4">
        <child id="1950447826683828796" name="target" index="3XvnJa" />
      </concept>
      <concept id="1198256887712" name="jetbrains.mps.lang.editor.structure.CellModel_Indent" flags="ng" index="3XFhqQ" />
      <concept id="1166049232041" name="jetbrains.mps.lang.editor.structure.AbstractComponent" flags="ng" index="1XWOmA">
        <reference id="1166049300910" name="conceptDeclaration" index="1XX52x" />
      </concept>
    </language>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1153417849900" name="jetbrains.mps.baseLanguage.structure.GreaterThanOrEqualsExpression" flags="nn" index="2d3UOw" />
      <concept id="1202948039474" name="jetbrains.mps.baseLanguage.structure.InstanceMethodCallOperation" flags="nn" index="liA8E" />
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1137021947720" name="jetbrains.mps.baseLanguage.structure.ConceptFunction" flags="in" index="2VMwT0">
        <child id="1137022507850" name="body" index="2VODD2" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1081236700937" name="jetbrains.mps.baseLanguage.structure.StaticMethodCall" flags="nn" index="2YIFZM">
        <reference id="1144433194310" name="classConcept" index="1Pybhc" />
      </concept>
      <concept id="1225271408483" name="jetbrains.mps.baseLanguage.structure.IsNotEmptyOperation" flags="nn" index="17RvpY" />
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068580320020" name="jetbrains.mps.baseLanguage.structure.IntegerConstant" flags="nn" index="3cmrfG">
        <property id="1068580320021" name="value" index="3cmrfH" />
      </concept>
      <concept id="1081516740877" name="jetbrains.mps.baseLanguage.structure.NotExpression" flags="nn" index="3fqX7Q">
        <child id="1081516765348" name="expression" index="3fr31v" />
      </concept>
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
        <child id="1068499141038" name="actualArgument" index="37wK5m" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1073239437375" name="jetbrains.mps.baseLanguage.structure.NotEqualsExpression" flags="nn" index="3y3z36" />
      <concept id="1080120340718" name="jetbrains.mps.baseLanguage.structure.AndExpression" flags="nn" index="1Wc70l" />
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1138056022639" name="jetbrains.mps.lang.smodel.structure.SPropertyAccess" flags="nn" index="3TrcHB">
        <reference id="1138056395725" name="property" index="3TsBF5" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
  </registry>
  <node concept="24kQdi" id="6ItNp1ojsEn">
    <ref role="1XX52x" to="u3iy:6ItNp1ojsDU" resolve="Integer" />
    <node concept="3F0A7n" id="6ItNp1ojsEp" role="2wV5jI">
      <ref role="1NtTu8" to="u3iy:6ItNp1ojsDW" resolve="value" />
    </node>
  </node>
  <node concept="24kQdi" id="6ItNp1okL7Y">
    <ref role="1XX52x" to="u3iy:6ItNp1okL7g" resolve="BinaryOperation" />
    <node concept="3EZMnI" id="6ItNp1okL80" role="2wV5jI">
      <node concept="3F1sOY" id="6ItNp1okL87" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:6ItNp1ojsi_" resolve="leftOperand" />
      </node>
      <node concept="3F0A7n" id="6ItNp1okL8d" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:6ItNp1okL7y" resolve="operator" />
        <ref role="1k5W1q" node="6ItNp1olMCP" resolve="operator" />
      </node>
      <node concept="3F1sOY" id="6ItNp1okL8l" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:6ItNp1ojsiA" resolve="rightOperand" />
      </node>
      <node concept="2iRfu4" id="6ItNp1okL83" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="6ItNp1okNp9">
    <ref role="1XX52x" to="u3iy:6ItNp1okNom" resolve="DataAccess" />
    <node concept="3EZMnI" id="6ItNp1okNpb" role="2wV5jI">
      <node concept="3F0ifn" id="6ItNp1okNpi" role="3EZMnx">
        <property role="3F0ifm" value="/" />
        <node concept="11LMrY" id="6ItNp1okR1K" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="3F0A7n" id="6ItNp1okNpw" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:6ItNp1okNon" resolve="path" />
        <node concept="1uO$qF" id="3XLz4IQkSgm" role="3F10Kt">
          <node concept="3nzxsE" id="3XLz4IQkSgn" role="1uO$qD">
            <node concept="3clFbS" id="3XLz4IQkSgo" role="2VODD2">
              <node concept="3clFbF" id="55O0TMOvOYA" role="3cqZAp">
                <node concept="1Wc70l" id="3XLz4IQkYD_" role="3clFbG">
                  <node concept="3fqX7Q" id="3XLz4IQkYKL" role="3uHU7w">
                    <node concept="2OqwBi" id="3XLz4IQkZBm" role="3fr31v">
                      <node concept="2OqwBi" id="3XLz4IQkZ08" role="2Oq$k0">
                        <node concept="pncrf" id="3XLz4IQkYM3" role="2Oq$k0" />
                        <node concept="3TrcHB" id="3XLz4IQkZfU" role="2OqNvi">
                          <ref role="3TsBF5" to="u3iy:6ItNp1okNon" resolve="path" />
                        </node>
                      </node>
                      <node concept="liA8E" id="3XLz4IQl02O" role="2OqNvi">
                        <ref role="37wK5l" to="wyt6:~String.startsWith(java.lang.String)" resolve="startsWith" />
                        <node concept="Xl_RD" id="3XLz4IQl04B" role="37wK5m">
                          <property role="Xl_RC" value="external.valueSets." />
                        </node>
                      </node>
                    </node>
                  </node>
                  <node concept="1Wc70l" id="55O0TMOvQwr" role="3uHU7B">
                    <node concept="2OqwBi" id="55O0TMOvPLC" role="3uHU7B">
                      <node concept="2OqwBi" id="55O0TMOvPbm" role="2Oq$k0">
                        <node concept="pncrf" id="55O0TMOvOY_" role="2Oq$k0" />
                        <node concept="3TrcHB" id="55O0TMOvPtX" role="2OqNvi">
                          <ref role="3TsBF5" to="u3iy:6ItNp1okNon" resolve="path" />
                        </node>
                      </node>
                      <node concept="17RvpY" id="55O0TMOvQ7P" role="2OqNvi" />
                    </node>
                    <node concept="2OqwBi" id="3XLz4IQkTo0" role="3uHU7w">
                      <node concept="2OqwBi" id="3XLz4IQkSIM" role="2Oq$k0">
                        <node concept="pncrf" id="3XLz4IQkSxp" role="2Oq$k0" />
                        <node concept="3TrcHB" id="3XLz4IQkSXG" role="2OqNvi">
                          <ref role="3TsBF5" to="u3iy:6ItNp1okNon" resolve="path" />
                        </node>
                      </node>
                      <node concept="liA8E" id="3XLz4IQkTIR" role="2OqNvi">
                        <ref role="37wK5l" to="wyt6:~String.startsWith(java.lang.String)" resolve="startsWith" />
                        <node concept="Xl_RD" id="3XLz4IQkTIV" role="37wK5m">
                          <property role="Xl_RC" value="external." />
                        </node>
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="1wgc9g" id="3XLz4IQkTLj" role="3XvnJa">
            <ref role="1wgcnl" node="3XLz4IQkTKU" resolve="external" />
          </node>
        </node>
        <node concept="1uO$qF" id="3XLz4IQl0gU" role="3F10Kt">
          <node concept="3nzxsE" id="3XLz4IQl0gW" role="1uO$qD">
            <node concept="3clFbS" id="3XLz4IQl0gY" role="2VODD2">
              <node concept="3clFbF" id="55O0TMOvQQ5" role="3cqZAp">
                <node concept="1Wc70l" id="55O0TMOvRuE" role="3clFbG">
                  <node concept="2OqwBi" id="55O0TMOvQQ7" role="3uHU7B">
                    <node concept="2OqwBi" id="55O0TMOvQQ8" role="2Oq$k0">
                      <node concept="pncrf" id="55O0TMOvQQ9" role="2Oq$k0" />
                      <node concept="3TrcHB" id="55O0TMOvQQa" role="2OqNvi">
                        <ref role="3TsBF5" to="u3iy:6ItNp1okNon" resolve="path" />
                      </node>
                    </node>
                    <node concept="17RvpY" id="55O0TMOvQQb" role="2OqNvi" />
                  </node>
                  <node concept="2OqwBi" id="3XLz4IQl0n1" role="3uHU7w">
                    <node concept="2OqwBi" id="3XLz4IQl0n2" role="2Oq$k0">
                      <node concept="pncrf" id="3XLz4IQl0n3" role="2Oq$k0" />
                      <node concept="3TrcHB" id="3XLz4IQl0n4" role="2OqNvi">
                        <ref role="3TsBF5" to="u3iy:6ItNp1okNon" resolve="path" />
                      </node>
                    </node>
                    <node concept="liA8E" id="3XLz4IQl0n5" role="2OqNvi">
                      <ref role="37wK5l" to="wyt6:~String.startsWith(java.lang.String)" resolve="startsWith" />
                      <node concept="Xl_RD" id="3XLz4IQl0n6" role="37wK5m">
                        <property role="Xl_RC" value="external.valueSets." />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="1wgc9g" id="3XLz4IQl0jj" role="3XvnJa">
            <ref role="1wgcnl" node="3XLz4IQkYn1" resolve="inlinable" />
          </node>
        </node>
      </node>
      <node concept="2iRfu4" id="6ItNp1okNpe" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="6ItNp1ol79l">
    <ref role="1XX52x" to="u3iy:6ItNp1ol78Q" resolve="String" />
    <node concept="3EZMnI" id="6ItNp1ol79s" role="2wV5jI">
      <node concept="3F0ifn" id="6ItNp1ol79z" role="3EZMnx">
        <property role="3F0ifm" value="&quot;" />
        <node concept="11LMrY" id="6ItNp1ol79S" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="3F0A7n" id="6ItNp1ol79D" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:6ItNp1ol78T" resolve="value" />
      </node>
      <node concept="3F0ifn" id="6ItNp1ol79L" role="3EZMnx">
        <property role="3F0ifm" value="&quot;" />
        <node concept="11L4FC" id="6ItNp1ol79Q" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="2iRfu4" id="6ItNp1ol79v" role="2iSdaV" />
    </node>
  </node>
  <node concept="V5hpn" id="6ItNp1olMCO">
    <property role="TrG5h" value="basic" />
    <node concept="14StLt" id="6ItNp1olMCP" role="V601i">
      <property role="TrG5h" value="operator" />
      <node concept="Vb9p2" id="6ItNp1olMCR" role="3F10Kt">
        <property role="Vbekb" value="g1_k_vY/BOLD" />
      </node>
    </node>
    <node concept="14StLt" id="51wT2Ro$kf1" role="V601i">
      <property role="TrG5h" value="it" />
      <node concept="Vb9p2" id="51wT2Ro$kfa" role="3F10Kt">
        <property role="Vbekb" value="g1_kEg4/ITALIC" />
      </node>
    </node>
    <node concept="14StLt" id="3XLz4IQkTKU" role="V601i">
      <property role="TrG5h" value="external" />
      <node concept="VechU" id="3XLz4IQkTL1" role="3F10Kt">
        <property role="Vb096" value="fLwANPn/red" />
      </node>
    </node>
    <node concept="14StLt" id="3XLz4IQkYn1" role="V601i">
      <property role="TrG5h" value="inlinable" />
      <node concept="VechU" id="3XLz4IQkYna" role="3F10Kt">
        <property role="Vb096" value="g1_qVrt/darkMagenta" />
      </node>
    </node>
  </node>
  <node concept="24kQdi" id="6ItNp1ooNzc">
    <ref role="1XX52x" to="u3iy:6ItNp1ooNyJ" resolve="It" />
    <node concept="3F0ifn" id="6ItNp1ooNze" role="2wV5jI">
      <property role="3F0ifm" value="it" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2Ro$ke5">
    <ref role="1XX52x" to="u3iy:51wT2Ro$kdv" resolve="Reduce" />
    <node concept="3EZMnI" id="51wT2Ro$ke7" role="2wV5jI">
      <node concept="3F1sOY" id="51wT2Ro$kek" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro$kdy" resolve="operand" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$kee" role="3EZMnx">
        <property role="3F0ifm" value=".reduce(" />
        <ref role="1k5W1q" node="6ItNp1olMCP" resolve="operator" />
        <node concept="11L4FC" id="51wT2Ro$kez" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
        <node concept="11LMrY" id="51wT2Ro$HkG" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="3F0ifn" id="51wT2Ro$keE" role="3EZMnx">
        <property role="3F0ifm" value="(accumulator, current)" />
        <ref role="1k5W1q" node="51wT2Ro$kf1" resolve="it" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$kfj" role="3EZMnx">
        <property role="3F0ifm" value="→" />
      </node>
      <node concept="3F1sOY" id="51wT2Ro$kfr" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro$kd$" resolve="lambda" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$kfF" role="3EZMnx">
        <property role="3F0ifm" value="," />
        <node concept="11L4FC" id="51wT2Ro$Hk_" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="3F1sOY" id="51wT2Ro$kgs" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro$kdB" resolve="initial" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$kfX" role="3EZMnx">
        <property role="3F0ifm" value=")" />
        <node concept="11L4FC" id="51wT2Ro$HkB" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="2iRfu4" id="51wT2Ro$kea" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2Ro$qtl">
    <ref role="1XX52x" to="u3iy:51wT2Ro$qsJ" resolve="IfThenElse" />
    <node concept="3EZMnI" id="51wT2Ro$qtn" role="2wV5jI">
      <node concept="3F0ifn" id="51wT2Ro$qtu" role="3EZMnx">
        <property role="3F0ifm" value="if" />
        <ref role="1k5W1q" node="6ItNp1olMCP" resolve="operator" />
      </node>
      <node concept="3F1sOY" id="51wT2Ro$qt$" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro$qsM" resolve="guard" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$qtG" role="3EZMnx">
        <property role="3F0ifm" value="then" />
      </node>
      <node concept="3F1sOY" id="51wT2Ro$qtQ" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro$qsO" resolve="then" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$qu2" role="3EZMnx">
        <property role="3F0ifm" value="else" />
      </node>
      <node concept="3F1sOY" id="51wT2Ro$qug" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro$qsR" resolve="else" />
      </node>
      <node concept="2iRfu4" id="51wT2Ro$qtq" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2Ro$wrr">
    <ref role="1XX52x" to="u3iy:51wT2Ro$wqW" resolve="Array" />
    <node concept="3EZMnI" id="51wT2Ro$wrt" role="2wV5jI">
      <node concept="3F0ifn" id="51wT2Ro$wr$" role="3EZMnx">
        <property role="3F0ifm" value="[" />
      </node>
      <node concept="3F2HdR" id="51wT2Ro$wrQ" role="3EZMnx">
        <property role="2czwfO" value=", " />
        <ref role="1NtTu8" to="u3iy:51wT2Ro$wqZ" resolve="members" />
        <node concept="2iRfu4" id="51wT2Ro$wrS" role="2czzBx" />
      </node>
      <node concept="3F0ifn" id="51wT2Ro$wrI" role="3EZMnx">
        <property role="3F0ifm" value="]" />
      </node>
      <node concept="2iRfu4" id="51wT2Ro$wrw" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2Ro$YzR">
    <ref role="1XX52x" to="u3iy:51wT2Ro$Yzm" resolve="Boolean" />
    <node concept="3F0A7n" id="51wT2Ro$YzT" role="2wV5jI">
      <ref role="1NtTu8" to="u3iy:51wT2Ro$Yzr" resolve="value" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2Ro_oXQ">
    <ref role="1XX52x" to="u3iy:51wT2Ro_oXn" resolve="Not" />
    <node concept="3EZMnI" id="51wT2Ro_oXS" role="2wV5jI">
      <node concept="3F0ifn" id="51wT2Ro_oXZ" role="3EZMnx">
        <property role="3F0ifm" value="!" />
        <ref role="1k5W1q" node="6ItNp1olMCP" resolve="operator" />
      </node>
      <node concept="3F1sOY" id="51wT2Ro_oY5" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2Ro_oXq" resolve="operand" />
      </node>
      <node concept="2iRfu4" id="51wT2Ro_oXV" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2RoDdwm">
    <ref role="1XX52x" to="u3iy:51wT2RoDdvt" resolve="VariadicInfixOperation" />
    <node concept="3EZMnI" id="51wT2RoDdwo" role="2wV5jI">
      <node concept="3EZMnI" id="51wT2RoDdwE" role="3EZMnx">
        <node concept="VPM3Z" id="51wT2RoDdwG" role="3F10Kt" />
        <node concept="3F0A7n" id="51wT2RoDdwU" role="3EZMnx">
          <ref role="1NtTu8" to="u3iy:51wT2RoDdvu" resolve="operator" />
        </node>
        <node concept="3F0ifn" id="51wT2RoDdx0" role="3EZMnx">
          <property role="3F0ifm" value=":" />
          <node concept="11L4FC" id="51wT2RoDdx4" role="3F10Kt">
            <property role="VOm3f" value="true" />
          </node>
        </node>
        <node concept="2iRfu4" id="51wT2RoDdwJ" role="2iSdaV" />
      </node>
      <node concept="3EZMnI" id="51wT2RoDdwq" role="3EZMnx">
        <node concept="VPM3Z" id="51wT2RoDdwr" role="3F10Kt" />
        <node concept="3XFhqQ" id="51wT2RoDdws" role="3EZMnx" />
        <node concept="3F2HdR" id="51wT2RoDdwt" role="3EZMnx">
          <ref role="1NtTu8" to="u3iy:51wT2RoDdvw" resolve="operands" />
          <node concept="2iRkQZ" id="51wT2RoDdwu" role="2czzBx" />
        </node>
        <node concept="2iRfu4" id="51wT2RoDdwv" role="2iSdaV" />
      </node>
      <node concept="2iRkQZ" id="51wT2RoDdww" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="51wT2RoDq9V">
    <ref role="1XX52x" to="u3iy:51wT2RoDq9q" resolve="PlusTime" />
    <node concept="3EZMnI" id="51wT2RoDq9X" role="2wV5jI">
      <node concept="3F1sOY" id="51wT2RoDqa4" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2RoDq9v" resolve="operand" />
      </node>
      <node concept="3F0ifn" id="51wT2RoDqaa" role="3EZMnx">
        <property role="3F0ifm" value="+" />
        <node concept="pkWqt" id="55O0TMOvaAU" role="pqm2j">
          <node concept="3clFbS" id="55O0TMOvaAV" role="2VODD2">
            <node concept="3clFbF" id="55O0TMOvaBi" role="3cqZAp">
              <node concept="2d3UOw" id="55O0TMOvcqS" role="3clFbG">
                <node concept="3cmrfG" id="55O0TMOvcrT" role="3uHU7w">
                  <property role="3cmrfH" value="0" />
                </node>
                <node concept="2OqwBi" id="55O0TMOvaOG" role="3uHU7B">
                  <node concept="pncrf" id="55O0TMOvaBh" role="2Oq$k0" />
                  <node concept="3TrcHB" id="55O0TMOvb9s" role="2OqNvi">
                    <ref role="3TsBF5" to="u3iy:51wT2RoDq9t" resolve="amount" />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="3F0A7n" id="51wT2RoDqai" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:51wT2RoDq9t" resolve="amount" />
      </node>
      <node concept="3F0A7n" id="55O0TMOtwGo" role="3EZMnx">
        <ref role="1NtTu8" to="u3iy:55O0TMOtwGl" resolve="unit" />
        <node concept="Vb9p2" id="55O0TMOuG_P" role="3F10Kt">
          <property role="Vbekb" value="g1_k_vY/BOLD" />
        </node>
      </node>
      <node concept="3F0ifn" id="55O0TMOtwG$" role="3EZMnx">
        <property role="3F0ifm" value="s" />
        <node concept="11L4FC" id="55O0TMOtwGF" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
        <node concept="pkWqt" id="55O0TMOuT$k" role="pqm2j">
          <node concept="3clFbS" id="55O0TMOuT$l" role="2VODD2">
            <node concept="3clFbF" id="55O0TMOuTCf" role="3cqZAp">
              <node concept="3y3z36" id="55O0TMOuVNK" role="3clFbG">
                <node concept="3cmrfG" id="55O0TMOuWfj" role="3uHU7w">
                  <property role="3cmrfH" value="1" />
                </node>
                <node concept="2YIFZM" id="55O0TMOuTCR" role="3uHU7B">
                  <ref role="37wK5l" to="wyt6:~Math.abs(int)" resolve="abs" />
                  <ref role="1Pybhc" to="wyt6:~Math" resolve="Math" />
                  <node concept="2OqwBi" id="55O0TMOuUe7" role="37wK5m">
                    <node concept="pncrf" id="55O0TMOuTMa" role="2Oq$k0" />
                    <node concept="3TrcHB" id="55O0TMOuUAg" role="2OqNvi">
                      <ref role="3TsBF5" to="u3iy:51wT2RoDq9t" resolve="amount" />
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="2iRfu4" id="51wT2RoDqa0" role="2iSdaV" />
    </node>
  </node>
</model>

